import styles from "./StatsCard.module.css";

export default function StatsCard({ label, value, hint, icon: Icon, color = "blue" }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
