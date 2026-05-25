import Stars from "@/ui/stars/Stars";
import styles from "./ReviewSummary.module.css";

export default function ReviewSummary({ avgRating = 0, totalReviews = 0 }) {
  return (
      <div className={styles.ratingInfo}>
        <span className={styles.ratingNumber}>{avgRating.toFixed(1)}</span>
        <div className={styles.starsBox}>
          <Stars rating={avgRating} size="1rem" />
          <div className={styles.reviewCountBox}>
            <span className={styles.countNumber}>{totalReviews}</span>
            <span className={styles.reviewLabel}>
              {totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </div>
  );
}
