import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertCircle,
  RefreshCw,
  Loader2,
  Wifi,
  WifiOff,
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface SystemMetric {
  label: string;
  value: string | number;
  color?: string;
}

interface SystemStats {
  systemId: string;
  systemName: string;
  metrics: SystemMetric[];
  lastUpdated: string;
  status: 'online' | 'offline' | 'error';
}

interface KPIData {
  systems: SystemStats[];
  overallStats: {
    totalSystems: number;
    onlineSystems: number;
  };
  lastFetch: string;
}

export function KPIDashboard() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const response = await fetch('/api/kpi/stats');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch KPI data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-slate-400">جاري تحميل المؤشرات...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-slate-500">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
        <p className="text-sm">لا توجد بيانات متاحة حالياً</p>
        <button onClick={() => fetchData()} className="mt-3 text-xs text-blue-500 hover:text-blue-600 transition-colors">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const { overallStats, systems } = data;
  const onlinePercentage = overallStats.totalSystems > 0 ? Math.round((overallStats.onlineSystems / overallStats.totalSystems) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50">
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800" data-testid="text-kpi-title">مؤشرات الأنظمة</h3>
            <p className="text-[10px] sm:text-xs text-slate-400">حالة الاتصال والبيانات المباشرة</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-700">{overallStats.onlineSystems}</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500">{overallStats.totalSystems - overallStats.onlineSystems}</span>
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-1 text-[10px] text-slate-600">
            <Wifi className="w-3 h-3 text-green-500" />
            <span>{overallStats.onlineSystems}/{overallStats.totalSystems}</span>
          </div>

          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
            data-testid="button-refresh-kpi"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">تحديث</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${onlinePercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-l from-green-500 to-emerald-400 rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {systems.map((system, index) => (
          <motion.div
            key={system.systemId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <div 
              className={`h-full rounded-xl border transition-all duration-200 overflow-hidden ${
                system.status === 'online' 
                  ? 'border-green-200/60 bg-white hover:shadow-md hover:border-green-300' 
                  : 'border-slate-200 bg-slate-50/50'
              }`} 
              data-testid={`card-kpi-${system.systemId}`}
            >
              <div className="p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight truncate">
                    {system.systemName}
                  </h4>
                  {system.status === 'online' ? (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500 animate-pulse" title="متصل" />
                  ) : (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-slate-300" title="غير متصل" />
                  )}
                </div>
                
                {system.status === 'online' && system.metrics.length > 0 ? (
                  <div className="space-y-1.5">
                    {system.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] sm:text-xs">
                        <span className="text-slate-500 truncate ml-2">{metric.label}</span>
                        <span 
                          className="font-bold flex-shrink-0 tabular-nums"
                          style={{ color: metric.color || '#334155' }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : system.status === 'online' ? (
                  <p className="text-[10px] text-slate-400 text-center py-2">لا توجد بيانات</p>
                ) : (
                  <div className="flex items-center justify-center gap-1 py-2">
                    <WifiOff className="w-3 h-3 text-slate-300" />
                    <p className="text-[10px] text-slate-400">غير متصل</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] sm:text-xs text-slate-400 text-center pt-1" data-testid="text-kpi-last-update">
        آخر تحديث: {new Date(data.lastFetch).toLocaleString('ar-SA')}
      </p>
    </div>
  );
}
