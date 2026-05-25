import styles from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import { useReviews } from "../hooks/useReviews";
import ReviewSummary from "./ReviewSummary";
import ReviewStats from "./ReviewStats";
import ReviewList from "./ReviewList";

export default function Reviews({averageRating, totalReviews}) {
  const { id } = useParams();
  const { data: reviewsData, isPending: fetchingReviews, error } = useReviews(id);
  const reviews = reviewsData?.data || {};
  
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.summarySection}>
          <ReviewSummary avgRating={averageRating} totalReviews={totalReviews} />
          <ReviewStats ratings={reviews} />
        </div>
        
        <div className={styles.listSection}>
          <ReviewList 
            reviews={reviews} 
            isPending={fetchingReviews} 
            error={error} 
          />
        </div>
      </div>
    </div>
  );
}
