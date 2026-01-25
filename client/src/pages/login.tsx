import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "Riyadh@2854") {
      localStorage.setItem("isAuthenticated", "true");
      setLocation("/");
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة الرياض الإلكترونية",
      });
    } else {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-primary/10 p-4 rounded-2xl shadow-sm inline-block mb-4">
            <School className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">منصة الرياض الإلكترونية</h1>
          <p className="text-slate-500 mt-2">يرجى تسجيل الدخول للمتابعة</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بيانات الاعتماد الخاصة بك للدخول للنظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="اسم المستخدم" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                <Lock className="w-5 h-5 ml-2" />
                دخول
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-slate-400 mt-8">
          © 1447 مدرسة الرياض الابتدائية
          <br />
          <span className="text-xs mt-1 block">تصميم وتطوير: صالح سفر الغامدي</span>
        </p>
      </div>
    </div>
  );
}
