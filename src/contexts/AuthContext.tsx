import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateAndRefreshToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const isValid = await validateAndRefreshToken();
        if (!isValid) {
          localStorage.removeItem('accessToken');
          setAccessToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Starting login process');
      
      // Smart environment detection
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      console.log('AuthContext: Environment:', {
        apiUrl,
        hostname: window.location.hostname,
        isLocalhost,
        mode: import.meta.env.MODE
      });
      
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: isLocalhost ? 'include' : 'omit',
        body: JSON.stringify({ email, password }),
      });

      console.log('AuthContext: Login response status:', response.status);
      console.log('AuthContext: Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('AuthContext: Login response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    }
  };

  // Token refresh logic
  useEffect(() => {
    if (!accessToken) return;

    const refreshInterval = setInterval(async () => {
      const isValid = await validateAndRefreshToken();
      if (!isValid) {
        logout();
      }
    }, 14 * 60 * 1000); // Refresh every 14 minutes

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
