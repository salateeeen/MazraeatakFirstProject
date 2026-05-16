import styles from "./FarmPricingSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function FarmPricingSkeleton() {
  return (
    <section className={styles.card}>
      <Skeleton className={styles.title} />
      <div className={styles.blocks}>
        {["weekday", "weekend"].map((key) => (
          <div key={key} className={styles.block}>
            <Skeleton className={styles.blockTitle} />
            <div className={styles.slots}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.slot}>
                  <Skeleton className={styles.slotLabel} />
                  <Skeleton className={styles.slotPrice} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
