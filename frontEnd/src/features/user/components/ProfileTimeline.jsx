import React from "react";
import { LuActivity, LuUser, LuHeart, LuCalendarDays } from "react-icons/lu";
import { MdLandscape, MdBookmark } from "react-icons/md";
import Title from "@/ui/title/Title";
import styles from "./ProfileTimeline.module.css";

// Helper to resolve timeline icons based on type
const getTimelineIcon = (type) => {
  switch (type) {
    case "farm":
      return <MdLandscape size={18} />;
    case "booking":
      return <MdBookmark size={18} />;
    case "profile":
      return <LuUser size={18} />;
    case "favorite":
      return <LuHeart size={18} />;
    case "join":
      return <LuCalendarDays size={18} />;
    default:
      return <LuActivity size={18} />;
  }
};

export default function ProfileTimeline({ activities }) {
  return (
    <section className={styles.activitySection}>
      <header className={styles.sectionHeader}>
        <LuActivity className={styles.sectionIcon} size={20} />
        <Title size="lg">Recent Activity</Title>
      </header>
      
      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>
        {activities.length === 0 ? (
          <div className={styles.emptyActivity}>
            <p>No recent activity recorded yet.</p>
          </div>
        ) : (
          <div className={styles.timelineList}>
            {activities.map((act) => (
              <div key={act.id} className={styles.timelineItem}>
                <div className={styles.timelineBadge}>
                  {getTimelineIcon(act.type)}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h4 className={styles.timelineTitle}>{act.title}</h4>
                    <span className={styles.timelineTime}>{act.time}</span>
                  </div>
                  <p className={styles.timelineDesc}>{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
