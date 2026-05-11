import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Loader2, WifiOff, Activity, CheckCircle2, XCircle } from "lucide-react";

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
  overallStats: { totalSystems: number; onlineSystems: number; };
  lastFetch: string;
}

export function KPIDashboard() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const response = await fetch('/api/kpi/stats');
      if (response.ok) setData(await response.json());
    } catch { /* silent */ } finally {
      setLoading(false); setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#C9A84C" }} />
        <p className="text-sm" style={{ color: "#0B5E3A" }}>جاري تحميل المؤشرات...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
        <p className="text-sm text-slate-500 mb-3">لا توجد بيانات متاحة حالياً</p>
        <button onClick={() => fetchData()}
          className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
          style={{ background: "linear-gradient(135deg,#C9A84C,#A0762A)", color: "#0B3D24" }}>
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const { overallStats, systems } = data;
  const onlinePercentage = overallStats.totalSystems > 0
    ? Math.round((overallStats.onlineSystems / overallStats.totalSystems) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
            <Activity className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold" style={{ color: "#0B3D24" }} data-testid="text-kpi-title">مؤشرات الأنظمة</h3>
            <p className="text-[10px] sm:text-xs text-slate-400">حالة الاتصال والبيانات المباشرة</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#0B5E3A" }} />
              <span className="text-xs font-bold" style={{ color: "#0B5E3A" }}>{overallStats.onlineSystems}</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500">{overallStats.totalSystems - overallStats.onlineSystems}</span>
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-1 text-[10px] font-bold" style={{ color: "#0B5E3A" }}>
            <span>{overallStats.onlineSystems}/{overallStats.totalSystems}</span>
          </div>

          <button onClick={() => fetchData(true)} disabled={refreshing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A0762A)", color: "#0B3D24" }}
            data-testid="button-refresh-kpi">
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">تحديث</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between text-[10px] mb-1.5 font-medium" style={{ color: "#0B5E3A" }}>
          <span>حالة الاتصال</span>
          <span style={{ color: "#C9A84C" }}>{onlinePercentage}%</span>
        </div>
        <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "rgba(11,94,58,0.1)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${onlinePercentage}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #0B5E3A, #C9A84C, #F0D87A)" }}
          />
        </div>
      </div>

      {/* System cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {systems.map((system, index) => (
          <motion.div key={system.systemId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <div
              className="h-full rounded-xl overflow-hidden transition-all duration-200"
              style={{
                border: system.status === 'online'
                  ? "1px solid rgba(11,94,58,0.25)"
                  : "1px solid rgba(201,168,76,0.1)",
                background: system.status === 'online' ? "#fff" : "rgba(253,251,245,0.8)",
              }}
              data-testid={`card-kpi-${system.systemId}`}
            >
              {/* Top micro-line */}
              <div className="h-[2px]" style={{
                background: system.status === 'online'
                  ? "linear-gradient(90deg, #0B5E3A, #C9A84C)"
                  : "rgba(201,168,76,0.2)"
              }} />
              <div className="p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <h4 className="text-[11px] sm:text-xs font-bold leading-tight truncate" style={{ color: "#0B3D24" }}>
                    {system.systemName}
                  </h4>
                  {system.status === 'online' ? (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse" style={{ background: "#0B5E3A" }} title="متصل" />
                  ) : (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-slate-300" title="غير متصل" />
                  )}
                </div>

                {system.status === 'online' && system.metrics.length > 0 ? (
                  <div className="space-y-1.5">
                    {system.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] sm:text-xs">
                        <span className="text-slate-500 truncate ml-2">{metric.label}</span>
                        <span className="font-bold flex-shrink-0 tabular-nums" style={{ color: metric.color || '#0B5E3A' }}>
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

      <p className="text-[10px] sm:text-xs text-center pt-1" style={{ color: "rgba(11,94,58,0.4)" }}
        data-testid="text-kpi-last-update">
        آخر تحديث: {new Date(data.lastFetch).toLocaleString('ar-SA')}
      </p>
    </div>
  );
}
