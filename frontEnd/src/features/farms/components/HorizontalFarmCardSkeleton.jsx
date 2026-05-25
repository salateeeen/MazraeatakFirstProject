import styles from "./HorizontalFarmCardSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function HorizontalFarmCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.img} />
      <div className={styles.info}>
        <Skeleton className={styles.badge} />
        <Skeleton className={styles.name} />
        <Skeleton className={styles.location} />
        <div className={styles.ratingRow}>
          <Skeleton className={styles.ratingBox} />
          <Skeleton className={styles.ratingText} />
        </div>
        <div className={styles.metaSection}>
          <div className={styles.meta}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className={styles.metaItem} />
            ))}
          </div>
        </div>
        <div className={styles.priceBox}>
          <Skeleton className={styles.price} />
        </div>
      </div>
    </div>
  );
}
