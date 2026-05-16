import { MdErrorOutline, MdRefresh } from "react-icons/md";
import styles from "./Error.module.css";

export default function Error({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again later.", 
  onRetry 
}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <MdErrorOutline size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.action}>
          <MdRefresh size={18} />
          Try Again
        </button>
      )}
    </div>
  );
}
