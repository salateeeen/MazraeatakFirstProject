import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }) {
  if (!status) return null;
  const normalized = String(status).toLowerCase();

  return (
    <span className={`${styles.badge} ${styles[normalized] || styles.pending}`}>
      {normalized}
    </span>
  );
}