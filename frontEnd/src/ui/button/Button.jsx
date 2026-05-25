import Spinner from "../spinner/Spinner";
import styles from "./Button.module.css";

export default function Button({
  className,
  type = "button",
  disabled,
  onClick,
  children,
  secondary,
  isPending,
}) {
  return (
    <button
      className={`${styles.btn} ${secondary ? styles.secondary : ""} ${className}`}
      type={type}
      disabled={disabled || isPending}
      onClick={onClick}
    >
      {isPending ? <Spinner size="xs" /> : children}
    </button>
  );
}
