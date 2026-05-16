import styles from "./NotificationsList.module.css";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useDeleteNotification } from "../hooks/useDeleteNotification";
import NotificationCard from "./NotificationCard";
import Spinner from "@/ui/spinner/Spinner";
import Empty from "@/ui/empty/Empty";
import { useConfirm } from "@/context/ConfirmContext";

export default function NotificationsList() {
  const { data: notificationsData, isPending: fetchingNotifications } = useNotifications();
  const { mutate: markAsRead, isPending: markingAsRead } = useMarkAsRead();
  const { mutate: deleteNotification, isPending: deletingNotification } = useDeleteNotification();
  const confirm = useConfirm();

  if (fetchingNotifications) return <Spinner />;

  const notifications = notificationsData?.data || [];

  if (notifications.length === 0) {
    return <Empty title="No notifications" message="You're all caught up!" />;
  }

  const handleDelete = async (id) => {
    const isConfirmed = await confirm({
      title: "Delete Notification",
      message: "Are you sure you want to remove this notification?",
      confirmLabel: "Delete",
      danger: true
    });
    
    if (isConfirmed) deleteNotification(id);
  };

  return (
    <div className={styles.list}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          onMarkAsRead={markAsRead}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
