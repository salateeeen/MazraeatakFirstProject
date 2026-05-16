import styles from "./FarmHighlightsSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function FarmHighlightsSkeleton() {
  return (
    <section className={styles.card}>
      <Skeleton className={styles.title} />
      <ul className={styles.list}>
        {[1, 2, 3].map((i) => (
          <li key={i} className={styles.item}>
            <Skeleton className={styles.itemIcon} />
            <Skeleton className={styles.itemText} />
          </li>
        ))}
      </ul>
    </section>
  );
}
