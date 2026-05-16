import styles from "./FarmInfoSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function FarmInfoSkeleton({ className }) {
  return (
    <section className={`${styles.card} ${className}`}>
      {/* Top Section */}
      <div className={styles.top}>
        <Skeleton
          className={styles.title}
          style={{ width: "60%", height: "28px" }}
        />

        <div className={styles.rating}>
          <Skeleton
            style={{ width: "110px", height: "18px" }}
          />
          <Skeleton
            style={{ width: "90px", height: "18px" }}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.info}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className={styles.infoItem}
            style={{ width: "140px", height: "18px" }}
          />
        ))}
      </div>

      {/* Facilities */}
      <div className={styles.facilities}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className={styles.chip}
            style={{ width: "90px", height: "32px" }}
          />
        ))}
      </div>
    </section>
  );
}
