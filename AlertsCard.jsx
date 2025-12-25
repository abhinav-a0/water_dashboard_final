export default function AlertsCard({ alerts = [] }) {
  return (
    <div className="alerts-list">
      {alerts.map((a, i) => (
        <div key={i} className={`alert-item ${a.type || ""}`}>
          <p>{a.message}</p>
          <span>
            {a.createdAt
              ? new Date(a.createdAt).toLocaleString()
              : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
