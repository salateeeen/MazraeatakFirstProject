import styles from "./MetricCard.module.css";

export default function MetricCard({ label, value, hint, icon: Icon, color = "blue" }) {
  return (
    <div className={`${styles.card} ${styles[color] || ""}`}>
      <div className={styles.top}>
        <div className={styles.iconWrapper}>
          {Icon && <Icon size={22} />}
        </div>
        <p className={styles.label}>{label}</p>
      </div>
      <p className={styles.value}>{value}</p>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
