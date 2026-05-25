import styles from "./Spinner.module.css";

export default function Spinner({ size = "md", color, className = "" }) {
  const sizeClass = styles[size] || styles.md;

  return (
    <div className={`${styles.container} ${sizeClass} ${className}`}>
      <div
        className={styles.spinner}
        style={color ? { "--spinner-color": color } : {}}
      >
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
