import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (username === "admin" && password === "Riyadh@2854") {
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة الرياض الإلكترونية",
      });
      setLocation("/");
    } else {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block mb-5">
            <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-2xl">
              <School className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="text-login-title">منصة الرياض الإلكترونية</h1>
          <p className="text-blue-200/70 text-sm sm:text-base" data-testid="text-login-subtitle">مدرسة الرياض الابتدائية - العام الدراسي 1447هـ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl" data-testid="card-login">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-bold text-center text-slate-800" data-testid="text-login-form-title">تسجيل الدخول</CardTitle>
              <CardDescription className="text-center text-slate-500">
                أدخل بيانات الاعتماد الخاصة بك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-700 font-medium">اسم المستخدم</Label>
                  <div className="relative">
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="اسم المستخدم" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="text-right pr-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      data-testid="input-username"
                    />
                    <User className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">كلمة المرور</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-right pr-10 pl-10 h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      data-testid="input-password"
                    />
                    <Lock className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg h-12 shadow-lg shadow-blue-500/25 transition-all duration-300"
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري الدخول...</span>
                    </div>
                  ) : (
                    <span>دخول</span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-blue-200/50 mt-8"
          data-testid="text-login-footer"
        >
          © 1447 مدرسة الرياض الابتدائية
          <br />
          <span className="text-xs mt-1 block text-blue-200/30">تصميم وتطوير: صالح سفر الغامدي</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
