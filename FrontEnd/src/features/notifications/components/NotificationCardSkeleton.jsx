import styles from "./NotificationCardSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function NotificationCardSkeleton() {
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <Skeleton className={styles.skeletonLine} />
        <Skeleton className={styles.skeletonSmall} />
      </div>
      <div className={styles.actions}>
        <Skeleton className={styles.skeletonButton} />
        <Skeleton className={styles.skeletonButton} />
      </div>
    </div>
  );
}