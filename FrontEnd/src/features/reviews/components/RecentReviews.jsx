import Empty from "@/ui/empty/Empty";
import styles from "./RecentReviews.module.css";
import Title from "@/ui/title/Title";
import { LuStar } from "react-icons/lu";

function getInitials(user) {
  if (!user) return "??";
  return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
}

export default function RecentReviews({ recentReviews = [] }) {
  return (
    <section className={styles.section}>
      <header><Title size="lg" mb="1.2rem">
        Recent Reviews
      </Title></header>
      
      {recentReviews.length === 0 ? (
        <Empty title="No reviews yet." message="You don't have any reviews yet." />
      ) : (
        <ul className={styles.list}>
          {recentReviews.map((r) => (
            <li key={r._id} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {getInitials(r.user)}
                  </div>
                  <span className={styles.itemName}>
                    {r.user?.firstName} {r.user?.lastName}
                  </span>
                </div>
                <div className={styles.rating}>
                  <LuStar size={14} fill="currentColor" />
                  <span>{r.rating}</span>
                </div>
              </div>
              <p className={styles.reviewMessage}>
                "{r.message?.slice(0, 100)}{r.message?.length > 100 ? "..." : ""}"
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
