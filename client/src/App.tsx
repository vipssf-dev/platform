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
    <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-slate-500 font-medium">جاري التحميل...</p>
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
