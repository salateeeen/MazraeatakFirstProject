import styles from "./CategoryCardSkeleton.module.css";
import Skeleton from "../../skeleton/Skeleton";

export default function CategoryCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.imageWrapper} />
    </div>
  );
}
