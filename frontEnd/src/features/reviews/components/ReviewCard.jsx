import Stars from "@/ui/stars/Stars";
import styles from "./ReviewCard.module.css";
import UserAvatar from "@/ui/profile/UserAvatar";
import { formatToRelativeTime } from "@/utils/handleDate";

export default function ReviewCard({ review }) {
  const { user, rating, message, createdAt } = review;

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <UserAvatar user={user} showName={true} readOnly />
        </div>
        <div className={styles.meta}>
          <span className={styles.date}>{formatToRelativeTime(createdAt)}</span>
          <div className={styles.starsWrapper}>
             <Stars rating={rating} size="0.9rem" readonly={true} />
          </div>
        </div>
      </header>
      
      <div className={styles.messageBox}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
