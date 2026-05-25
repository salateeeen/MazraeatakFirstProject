import styles from "./ReviewCardSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";
import { memo } from "react";

function ReviewCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.profile}>
        <Skeleton className={styles.avatar} />
        <Skeleton className={styles.profileName} />
      </div>
      <div className={styles.rateDate}>
        <Skeleton className={styles.rate} />
        <Skeleton className={styles.date} />
      </div>
      <Skeleton className={styles.message} />
    </div>
  );
}

export default memo(ReviewCardSkeleton);
