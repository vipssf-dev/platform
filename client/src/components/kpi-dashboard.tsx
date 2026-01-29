import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  RefreshCw,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SystemStats {
  systemId: string;
  systemName: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  lastUpdated: string;
  status: 'online' | 'offline' | 'error';
}

interface KPIData {
  systems: SystemStats[];
  overallStats: {
    totalSystems: number;
    onlineSystems: number;
    totalTasks: number;
    completedTasks: number;
    overallCompletionRate: number;
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
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">مؤشرات الإنجاز</h3>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">تحديث</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">إجمالي الأنظمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold">{overallStats.totalSystems}</span>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">{overallStats.onlineSystems} نظام متصل</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">المهام المنجزة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold">{overallStats.completedTasks}</span>
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">من {overallStats.totalTasks} مهمة</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">قيد التنفيذ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold">{overallStats.totalTasks - overallStats.completedTasks}</span>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">مهمة متبقية</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">نسبة الإنجاز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-bold">{overallStats.overallCompletionRate}%</span>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${overallStats.overallCompletionRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">تفاصيل الأنظمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-right py-3 px-2 font-medium text-slate-600">النظام</th>
                  <th className="text-center py-3 px-2 font-medium text-slate-600">الحالة</th>
                  <th className="text-center py-3 px-2 font-medium text-slate-600 hidden sm:table-cell">المنجز</th>
                  <th className="text-center py-3 px-2 font-medium text-slate-600 hidden sm:table-cell">الإجمالي</th>
                  <th className="text-center py-3 px-2 font-medium text-slate-600">الإنجاز</th>
                </tr>
              </thead>
              <tbody>
                {systems.map((system, index) => (
                  <motion.tr
                    key={system.systemId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-2 font-medium text-slate-800">{system.systemName}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        system.status === 'online' 
                          ? 'bg-green-100 text-green-700' 
                          : system.status === 'offline'
                          ? 'bg-slate-100 text-slate-500'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          system.status === 'online' 
                            ? 'bg-green-500' 
                            : system.status === 'offline'
                            ? 'bg-slate-400'
                            : 'bg-red-500'
                        }`} />
                        {system.status === 'online' ? 'متصل' : system.status === 'offline' ? 'غير متصل' : 'خطأ'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-600 hidden sm:table-cell">{system.completedTasks}</td>
                    <td className="py-3 px-2 text-center text-slate-600 hidden sm:table-cell">{system.totalTasks}</td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2 hidden sm:block">
                          <div 
                            className={`h-2 rounded-full ${
                              system.completionRate >= 75 
                                ? 'bg-green-500' 
                                : system.completionRate >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${system.completionRate}%` }}
                          />
                        </div>
                        <span className="font-medium text-slate-700">{system.completionRate}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-slate-400 text-center">
        آخر تحديث: {new Date(data.lastFetch).toLocaleString('ar-SA')}
      </p>
    </div>
  );
}
