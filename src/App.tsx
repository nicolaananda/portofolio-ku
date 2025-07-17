import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";

// Layout
import MainLayout from "./layouts/MainLayout";

// Lazy loaded public pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const PortfolioDetailPage = lazy(() => import("./pages/PortfolioDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

// Lazy loaded admin components (for better code splitting)
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PortfolioListPage = lazy(() => import("./pages/PortfolioListPage"));
const PortfolioEditPage = lazy(() => import("./pages/PortfolioEditPage"));
const PortfolioCreatePage = lazy(() => import("./pages/PortfolioCreatePage"));
const ContactListPage = lazy(() => import("./pages/ContactListPage"));

// Enhanced loading component with better UX
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex h-screen w-full items-center justify-center bg-white">
    <div className="text-center">
      <div className="relative mb-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <div className="absolute inset-0 h-10 w-10 mx-auto animate-ping rounded-full border-2 border-primary/20"></div>
      </div>
      <p className="text-gray-600 animate-pulse">{message}</p>
    </div>
  </div>
);

// Specific loading components for different sections
const AdminLoadingSpinner = () => <LoadingSpinner message="Loading admin panel..." />;
const PageLoadingSpinner = () => <LoadingSpinner message="Loading page..." />;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optimize query caching
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Use BrowserRouter for clean URLs
const RouterComponent = BrowserRouter;

// Error Boundary Component
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-white">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <RouterComponent>
              <Routes>
                {/* Public Routes with optimized loading */}
                <Route path="/" element={<MainLayout />}>
                  <Route 
                    index 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <HomePage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="about" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <AboutPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="portfolio" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <PortfolioPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="portfolio/:id" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <PortfolioDetailPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="blog" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <BlogPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="blog/:id" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <BlogPostPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="contact" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <ContactPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="login" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <LoginPage />
                      </Suspense>
                    } 
                  />
                </Route>

                {/* Protected Admin Routes with separate loading */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminLoadingSpinner />}>
                        <AdminLayout>
                          <DashboardPage />
                        </AdminLayout>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/portfolio"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminLoadingSpinner />}>
                        <AdminLayout>
                          <PortfolioListPage />
                        </AdminLayout>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/portfolio/create"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminLoadingSpinner />}>
                        <AdminLayout>
                          <PortfolioCreatePage />
                        </AdminLayout>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/portfolio/:id/edit"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminLoadingSpinner />}>
                        <AdminLayout>
                          <PortfolioEditPage />
                        </AdminLayout>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contact"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminLoadingSpinner />}>
                        <AdminLayout>
                          <ContactListPage />
                        </AdminLayout>
                      </Suspense>
                    </ProtectedRoute>
                  }
                />

                {/* Catch all route */}
                <Route 
                  path="*" 
                  element={
                    <Suspense fallback={<PageLoadingSpinner />}>
                      <NotFoundPage />
                    </Suspense>
                  } 
                />
              </Routes>
            </RouterComponent>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
