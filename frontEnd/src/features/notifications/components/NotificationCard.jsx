import styles from "./NotificationCard.module.css";
import {
  MdEventNote,
  MdCancel,
  MdRateReview,
  MdNotifications,
  MdCheckCircle,
} from "react-icons/md";
import DeleteButton from "@/ui/icons/DeleteButton";
import { formatToRelativeTime } from "@/utils/handleDate";

function getNotificationIcon(content = "") {
  const lower = content.toLowerCase();
  if (lower.includes("cancelled")) return { Icon: MdCancel, color: "red" };
  if (lower.includes("booking") || lower.includes("booked")) return { Icon: MdEventNote, color: "blue" };
  if (lower.includes("review")) return { Icon: MdRateReview, color: "yellow" };
  return { Icon: MdNotifications, color: "green" };
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  const { _id, content, read, metadata, createdAt } = notification;
  const { Icon, color } = getNotificationIcon(content);

  return (
    <div className={`${styles.notification} ${read ? styles.read : styles.unread}`}>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.body}>
        <p className={styles.message}>{content}</p>
        <div className={styles.meta}>
          {metadata?.timeSlot && (
            <span className={styles.slot}>{metadata.timeSlot}</span>
          )}
          <span className={styles.time}>{formatToRelativeTime(createdAt)}</span>
        </div>
      </div>

      <div className={styles.actions}>
        {!read && (
          <button
            className={styles.markBtn}
            onClick={() => onMarkAsRead(_id)}
            title="Mark as read"
          >
            <MdCheckCircle size={20} />
          </button>
        )}
       <DeleteButton onDelete={()=> onDelete(_id)} confirming={false}/>
      </div>
    </div>
  );
}
