import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";

// Admin-only pages are lazy-loaded so public visitors (the vast majority)
// don't download the admin dashboard/auth bundle on first load.
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth">
        <Suspense fallback={null}>
          <AuthPage />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Redirect to="/auth" />
      </Route>
      <ProtectedRoute
        path="/dashboard"
        component={() => (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
