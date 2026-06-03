import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f4f6f9" },
  main: { maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 2rem" },
  heading: { fontSize: 24, fontWeight: 700, marginBottom: 4 },
  sub: { fontSize: 14, color: "#777", marginBottom: "1.5rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  card: { background: "#fff", borderRadius: 10, padding: "1.25rem", border: "1px solid #e4e4e4" },
  cardLabel: { fontSize: 12, color: "#999", fontWeight: 600, textTransform: "uppercase" as const, marginBottom: 6 },
  cardValue: { fontSize: 28, fontWeight: 700 },
  badge: { display: "inline-block", fontSize: 12, padding: "3px 10px", borderRadius: 999, background: "#f0faf0", color: "#1a7a1a", fontWeight: 600, marginLeft: 8 },
};

const STATS = [
  { label: "Total sessions", value: "142", testid: "stat-sessions" },
  { label: "Active users", value: "38", testid: "stat-users" },
  { label: "Uptime", value: "99.9%", testid: "stat-uptime" },
  { label: "Errors today", value: "0", testid: "stat-errors" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={styles.page} data-testid="dashboard-page">
      <NavBar />
      <main style={styles.main}>
        <h1 style={styles.heading} data-testid="dashboard-heading">
          Dashboard <span style={styles.badge} data-testid="dashboard-status">Live</span>
        </h1>
        <p style={styles.sub} data-testid="dashboard-welcome">
          Welcome back, {user?.name}. Here&apos;s what&apos;s happening.
        </p>
        <div style={styles.grid} data-testid="stats-grid">
          {STATS.map((s) => (
            <div key={s.label} style={styles.card} data-testid={s.testid}>
              <p style={styles.cardLabel}>{s.label}</p>
              <p style={styles.cardValue}>{s.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
