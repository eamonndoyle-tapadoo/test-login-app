import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "#f4f6f9",
  },
  card: {
    background: "#fff", borderRadius: 12, padding: "2.5rem 2rem",
    border: "1px solid #e4e4e4", width: "100%", maxWidth: 400,
  },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
  sub: { fontSize: 14, color: "#777", marginBottom: "1.5rem" },
  field: { marginBottom: "1rem" },
  label: { fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4, color: "#444" },
  input: {
    width: "100%", padding: "9px 11px", fontSize: 14,
    border: "1px solid #ddd", borderRadius: 7, outline: "none",
    boxSizing: "border-box" as const,
  },
  inputError: { borderColor: "#e55" },
  error: {
    fontSize: 13, color: "#c00", background: "#fff0f0",
    border: "1px solid #fcc", borderRadius: 7,
    padding: "8px 12px", marginBottom: "1rem",
  },
  hint: { fontSize: 12, color: "#aaa", marginTop: 4 },
  btn: {
    width: "100%", padding: "10px", fontSize: 14, fontWeight: 700,
    background: "#111", color: "#fff", border: "none",
    borderRadius: 7, cursor: "pointer", marginTop: 8,
  },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
};

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed.");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card} data-testid="login-card">
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your account to continue.</p>

        {error && (
          <div style={styles.error} role="alert" data-testid="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate data-testid="login-form">
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              autoComplete="email"
              style={{ ...styles.input, ...(fieldErrors.email ? styles.inputError : {}) }}
              data-testid="email-input"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" style={{ ...styles.hint, color: "#c00" }} data-testid="email-error">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{ ...styles.input, ...(fieldErrors.password ? styles.inputError : {}) }}
              data-testid="password-input"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            {fieldErrors.password && (
              <p id="password-error" style={{ ...styles.hint, color: "#c00" }} data-testid="password-error">
                {fieldErrors.password}
              </p>
            )}
            <p style={styles.hint}>Hint: user@example.com / password123</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
            data-testid="login-submit"
            aria-busy={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
