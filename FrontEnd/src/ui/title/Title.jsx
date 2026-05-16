import { capitalizeFirstLetter } from "@/utils/handleStrings";
import styles from "./Title.module.css";

export default function Title({
  children,
  size = "lg",
  subtitle,
  mb = "1rem",
  center = false,
  className = "",
}) {
  const containerClass = `${styles.container} ${center ? styles.center : ""} ${className}`;
  const titleClass = `${styles.title} ${styles[size]}`;

  if (typeof children === "string") {
    children = capitalizeFirstLetter(children);
  }

  return (
    <div className={containerClass} style={{ marginBottom: mb }}>
      <h2 className={titleClass}>{children}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
