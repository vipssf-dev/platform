import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  AlertCircle,
  RefreshCw,
  Loader2,
  Wifi,
  WifiOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-slate-500">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
        <p>لا توجد بيانات متاحة حالياً</p>
      </div>
    );
  }

  const { overallStats, systems } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">مؤشرات الأنظمة</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Wifi className="w-4 h-4 text-green-500" />
            <span>{overallStats.onlineSystems}/{overallStats.totalSystems} متصل</span>
          </div>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">تحديث</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {systems.map((system, index) => (
          <motion.div
            key={system.systemId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`h-full border-2 transition-colors ${
              system.status === 'online' 
                ? 'border-green-200 bg-white' 
                : 'border-slate-200 bg-slate-50'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800">
                    {system.systemName}
                  </CardTitle>
                  {system.status === 'online' ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      متصل
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-500">
                      <WifiOff className="w-3 h-3" />
                      غير متصل
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {system.status === 'online' && system.metrics.length > 0 ? (
                  <div className="space-y-2">
                    {system.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{metric.label}</span>
                        <span 
                          className="font-bold"
                          style={{ color: metric.color || '#1e293b' }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : system.status === 'online' ? (
                  <p className="text-xs text-slate-400 text-center py-2">
                    لا توجد بيانات
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">
                    يتعذر الاتصال بالنظام
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center">
        آخر تحديث: {new Date(data.lastFetch).toLocaleString('ar-SA')}
      </p>
    </div>
  );
}
