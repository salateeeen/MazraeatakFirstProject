import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import styles from "./ReviewList.module.css";
import Empty from "@/ui/empty/Empty";
import Error from "@/ui/error/Error";

export default function ReviewList({ reviews = [], isPending, error }) {
  return (
    <div className={styles.list}>
      {isPending &&
        Array.from({ length: 3 }, (_, i) => <ReviewCardSkeleton key={i} />)}
      {!isPending && error && (
        <Error message={error.message || "Failed to load reviews"} />
      )}
      {!isPending && !error && reviews.length === 0 && (
        <Empty
          title="No reviews found"
          message="Be the first to leave a review!"
        />
      )}

      {!isPending &&
        !error &&
        reviews.length > 0 &&
        reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
    </div>
  );
}
