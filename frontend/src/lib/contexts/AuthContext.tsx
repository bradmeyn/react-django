// contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  business: {
    id: string;
    name: string;
  };
  phone: string;
}

// Default empty user
const defaultUser: User = {
  id: "123",
  email: "test@mail.com",
  first_name: "Brad",
  last_name: "Meyn",
  business: {
    id: "321",
    name: "Mock Biz",
  },
  phone: "0412",
};

export interface AuthContextType {
  user: User; // No longer nullable
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  isAuthenticated: false,
  loading: false,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For development/demo, hardcode a user
        // In production, you would check for a token and validate with your API

        // Mock authentication check (replace with actual API call)
        const mockUser = {
          id: "12345",
          email: "brad@mail.com",
          first_name: "Brad",
          last_name: "Meyn",
          business: {
            id: "123",
            name: "Mock Business",
          },
          phone: "0412345678",
        };

        setUser(mockUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(defaultUser);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock successful login (replace with actual API call)
      console.log("Logging in with:", credentials);

      // In a real app, this would be an API call:
      // const response = await fetch('/api/auth/login', {...})

      const mockUser = {
        id: "12345",
        email: credentials.email,
        first_name: "Brad",
        last_name: "Meyn",
        business: {
          id: "123",
          name: "Mock Business",
        },
        phone: "0412345678",
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // In production, clear tokens from storage
    setUser(defaultUser);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
