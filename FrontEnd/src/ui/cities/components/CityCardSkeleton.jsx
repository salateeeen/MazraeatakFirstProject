import styles from "./CityCardSkeleton.module.css";
import Skeleton from "../../skeleton/Skeleton";

export default function CityCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.imageSkeleton} />
    </div>
  );
}