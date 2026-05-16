import styles from "./BookingCTASkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function BookingCTASkeleton() {
  return (
    <section className={styles.card}>
      <Skeleton className={styles.title} />
      <Skeleton className={styles.subtitle} />
      <div className={styles.body}>
        <Skeleton className={styles.slotsArea} />
        <Skeleton className={styles.button} />
      </div>
    </section>
  );
}
