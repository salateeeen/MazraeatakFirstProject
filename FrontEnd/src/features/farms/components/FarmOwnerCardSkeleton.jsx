import styles from "./FarmOwnerCardSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function FarmOwnerCardSkeleton() {
  return (
    <section className={styles.card}>
      <Skeleton className={styles.title} />
      <div className={styles.profile}>
        <Skeleton className={styles.avatar} />
        <Skeleton className={styles.profileName} />
      </div>
      <Skeleton className={styles.note} />
    </section>
  );
}
