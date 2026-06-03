import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock credentials — easy for tests to reference
const MOCK_USERS: Record<string, { password: string; name: string }> = {
  "user@example.com": { password: "password123", name: "Test User" },
  "admin@example.com": { password: "admin123", name: "Admin User" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 400));
    const match = MOCK_USERS[email.toLowerCase()];
    if (match && match.password === password) {
      setUser({ email: email.toLowerCase(), name: match.name });
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password." };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
