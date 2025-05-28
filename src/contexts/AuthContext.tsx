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

  useEffect(() => {
    // Check for existing token and validate it on mount
    const validateToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // Try to refresh the token
          const response = await fetch('http://localhost:5002/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
            setIsAuthenticated(true);
          } else {
            // If refresh fails, clear the token
            localStorage.removeItem('accessToken');
            setAccessToken(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('accessToken');
          setAccessToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await fetch('http://localhost:5002/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  // Add token refresh logic
  useEffect(() => {
    if (!accessToken) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5002/api/auth/refresh-token', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          localStorage.setItem('accessToken', data.accessToken);
        } else {
          // If refresh fails, logout
          logout();
        }
      } catch (error) {
        console.error('Token refresh error:', error);
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
