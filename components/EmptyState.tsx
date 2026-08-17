export default function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">✨</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
