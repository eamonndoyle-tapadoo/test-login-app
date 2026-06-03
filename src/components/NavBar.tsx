import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 1.5rem", height: 56, background: "#fff",
    borderBottom: "1px solid #e4e4e4", marginBottom: "2rem",
  },
  brand: { fontWeight: 700, fontSize: 18, color: "#111" },
  links: { display: "flex", gap: "1.5rem", alignItems: "center" },
  link: { fontSize: 14, color: "#555", fontWeight: 500 },
  user: { fontSize: 13, color: "#888" },
  btn: {
    padding: "6px 14px", fontSize: 13, fontWeight: 600,
    background: "#111", color: "#fff", border: "none",
    borderRadius: 7, cursor: "pointer",
  },
};

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={styles.nav} data-testid="navbar">
      <span style={styles.brand} data-testid="navbar-brand">TestApp</span>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link} data-testid="nav-dashboard">Dashboard</Link>
        <Link to="/profile" style={styles.link} data-testid="nav-profile">Profile</Link>
        <span style={styles.user} data-testid="navbar-user-email">{user?.email}</span>
        <button
          style={styles.btn}
          onClick={handleLogout}
          data-testid="logout-button"
          aria-label="Log out"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
