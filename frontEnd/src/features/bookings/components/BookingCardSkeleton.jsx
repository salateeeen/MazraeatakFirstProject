import styles from "./BookingCardSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function BookingCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.image} />
      <div className={styles.info}>
        <div className={styles.header}>
          <Skeleton className={styles.title} />
          <div className={styles.statusBox}>
            <Skeleton className={styles.dot} />
            <Skeleton className={styles.status} />
          </div>
        </div>
        <div className={styles.dates}>
          <Skeleton className={styles.date} />
          <Skeleton className={styles.duration} />
        </div>
        <div className={styles.subInfo}>
          <Skeleton className={styles.price} />
        </div>
        <div className={styles.actions}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className={styles.actionBtn} />
          ))}
        </div>
      </div>
    </div>
  );
}
