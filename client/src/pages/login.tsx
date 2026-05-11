import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Eye, EyeOff } from "lucide-react";
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
      toast({ title: "تم تسجيل الدخول بنجاح", description: "مرحباً بك في منصة الرياض الإلكترونية" });
      setLocation("/");
    } else {
      toast({ variant: "destructive", title: "خطأ في تسجيل الدخول", description: "اسم المستخدم أو كلمة المرور غير صحيحة" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans relative overflow-hidden bg-islamic-pattern" dir="rtl"
      style={{ background: "linear-gradient(135deg, #062618 0%, #0B5E3A 35%, #083D27 65%, #041A10 100%)" }}>

      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-100" />

      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0D7A4E 0%, transparent 70%)" }} />

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0D87A, #C9A84C, transparent)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md px-4 relative z-10"
      >
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mb-8"
        >
          {/* Geometric emblem */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-40"
              style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
            <div className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                borderColor: "rgba(201,168,76,0.5)",
                boxShadow: "0 0 30px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)"
              }}>
              {/* 8-pointed star SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="22,2 27,15 40,15 30,23 34,37 22,30 10,37 14,23 4,15 17,15"
                  fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
                <polygon points="22,6 26,16 37,16 29,22 32,34 22,27 12,34 15,22 7,16 18,16"
                  fill="none" stroke="#F0D87A" strokeWidth="0.6" opacity="0.4" />
                <circle cx="22" cy="22" r="5" fill="#C9A84C" opacity="0.9" />
                <circle cx="22" cy="22" r="3" fill="#F0D87A" opacity="0.7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight"
            style={{ textShadow: "0 0 40px rgba(201,168,76,0.4), 0 2px 4px rgba(0,0,0,0.5)" }}
            data-testid="text-login-title">
            منصة الرياض الإلكترونية
          </h1>
          <p className="text-sm font-medium" style={{ color: "rgba(201,168,76,0.75)" }}
            data-testid="text-login-subtitle">
            مدرسة الرياض الابتدائية · العام الدراسي 1447هـ
          </p>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-16 opacity-40" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
            <div className="h-px w-16 opacity-40" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(4,30,18,0.82) 0%, rgba(8,50,28,0.88) 100%)",
              border: "1px solid rgba(201,168,76,0.35)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.12), inset 0 1px 0 rgba(201,168,76,0.2)"
            }}
            data-testid="card-login"
          >
            {/* Card gold top line */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

            <div className="p-7 sm:p-8">
              <h2 className="text-lg font-bold text-center mb-1" style={{ color: "#F0D87A" }}
                data-testid="text-login-form-title">تسجيل الدخول</h2>
              <p className="text-xs text-center mb-6" style={{ color: "rgba(201,168,76,0.5)" }}>
                أدخل بيانات الاعتماد الخاصة بك
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold" style={{ color: "rgba(240,216,122,0.85)" }}>
                    اسم المستخدم
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="اسم المستخدم"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="h-12 pr-10 text-right transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#fff",
                        borderRadius: "10px"
                      }}
                      data-testid="input-username"
                    />
                    <User className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(201,168,76,0.5)" }} />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold" style={{ color: "rgba(240,216,122,0.85)" }}>
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10 pl-10 text-right transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#fff",
                        borderRadius: "10px"
                      }}
                      data-testid="input-password"
                    />
                    <Lock className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(201,168,76,0.5)" }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 left-3 -translate-y-1/2 transition-colors"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold rounded-xl border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                  style={{
                    background: isLoading
                      ? "rgba(201,168,76,0.5)"
                      : "linear-gradient(135deg, #C9A84C 0%, #E8C96A 40%, #C9A84C 70%, #A0762A 100%)",
                    color: "#0B3D24",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                  }}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(11,61,36,0.3)", borderTopColor: "#0B3D24" }} />
                      <span>جاري الدخول...</span>
                    </div>
                  ) : (
                    <span>دخول</span>
                  )}
                </Button>
              </form>
            </div>

            {/* Card bottom line */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-7 space-y-1"
          data-testid="text-login-footer"
        >
          <span className="block text-xs" style={{ color: "rgba(201,168,76,0.4)" }}>
            © 1447 مدرسة الرياض الابتدائية
          </span>
          <span className="block text-[11px]" style={{ color: "rgba(201,168,76,0.25)" }}>
            تصميم وتطوير: صالح سفر الغامدي
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
