import styles from "./Button.module.css";

export default function Button({
  className,
  type = "button",
  disabled,
  onClick,
  children,
  secondary,
}) {
  return (
    <button
      className={`${styles.btn} ${secondary ? styles.secondary : ""} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
