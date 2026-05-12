/**
 * Riyadh School Platform (Frontend)
 * System Type : School Management System
 * Owner       : صالح سفر الغامدي
 * Year        : 1447H / 2025
 * © All Rights Reserved
 */
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ExamsHub = lazy(() => import("@/pages/exams-hub"));
const TechnicalHub = lazy(() => import("@/pages/technical-hub"));
const SchoolAffairsHub = lazy(() => import("@/pages/school-affairs-hub"));
const StudentsHub = lazy(() => import("@/pages/students-hub"));
const EducationalHub = lazy(() => import("@/pages/educational-hub"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans relative overflow-hidden" dir="rtl"
      style={{ background: "linear-gradient(135deg, #062618 0%, #0B5E3A 50%, #083D27 100%)" }}>
      <div className="absolute inset-0 bg-islamic-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0D87A, #C9A84C, transparent)" }} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.12)", border: "1.5px solid rgba(201,168,76,0.4)" }}>
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#F0D87A" }} />
          </div>
        </div>
        <p className="text-sm font-bold" style={{ color: "rgba(201,168,76,0.7)" }}>جاري التحميل...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/">
          <ProtectedRoute component={Dashboard} />
        </Route>
        <Route path="/dashboard">
          <ProtectedRoute component={Dashboard} />
        </Route>
        <Route path="/exams">
          <ProtectedRoute component={ExamsHub} />
        </Route>
        <Route path="/technical">
          <ProtectedRoute component={TechnicalHub} />
        </Route>
        <Route path="/school-affairs">
          <ProtectedRoute component={SchoolAffairsHub} />
        </Route>
        <Route path="/students">
          <ProtectedRoute component={StudentsHub} />
        </Route>
        <Route path="/educational">
          <ProtectedRoute component={EducationalHub} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
