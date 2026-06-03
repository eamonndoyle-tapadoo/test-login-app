import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f4f6f9" },
  main: { maxWidth: 600, margin: "0 auto", padding: "0 1.5rem 2rem" },
  card: { background: "#fff", borderRadius: 10, padding: "1.5rem", border: "1px solid #e4e4e4" },
  heading: { fontSize: 20, fontWeight: 700, marginBottom: "1.25rem" },
  row: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0", fontSize: 14 },
  label: { color: "#888", fontWeight: 500 },
  value: { fontWeight: 600 },
};

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div style={styles.page} data-testid="profile-page">
      <NavBar />
      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>My Profile</h1>
          <div style={styles.row} data-testid="profile-name-row">
            <span style={styles.label}>Full name</span>
            <span style={styles.value} data-testid="profile-name">{user?.name}</span>
          </div>
          <div style={styles.row} data-testid="profile-email-row">
            <span style={styles.label}>Email</span>
            <span style={styles.value} data-testid="profile-email">{user?.email}</span>
          </div>
          <div style={styles.row} data-testid="profile-role-row">
            <span style={styles.label}>Role</span>
            <span style={styles.value} data-testid="profile-role">
              {user?.email.startsWith("admin") ? "Administrator" : "Standard User"}
            </span>
          </div>
          <div style={styles.row} data-testid="profile-status-row">
            <span style={styles.label}>Account status</span>
            <span style={{ ...styles.value, color: "#1a7a1a" }} data-testid="profile-status">Active</span>
          </div>
        </div>
      </main>
    </div>
  );
}
