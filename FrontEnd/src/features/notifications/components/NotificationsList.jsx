import styles from "./NotificationsList.module.css";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useDeleteNotification } from "../hooks/useDeleteNotification";
import NotificationCard from "./NotificationCard";
import Spinner from "@/ui/spinner/Spinner";
import Empty from "@/ui/empty/Empty";

export default function NotificationsList() {
  const { data: notifications, isPending: fetchingNotifications, error } =
    useNotifications();
  const { mutate: markAsRead, isPending: markingAsRead } = useMarkAsRead();
  const { mutate: deleteNotification, isPending: deletingNotification } =
    useDeleteNotification();

  if (fetchingNotifications) return <Spinner />;

  if (error) return <Error title="Failed to fetch notifications" message={error.message} />;
  
  if (!notifications?.results) {
    return <Empty title="No notifications" message="You're all caught up!" />;
  }
  
  return (
    <div className={styles.list}>
      {notifications?.data?.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
        />
      ))}
    </div>
  );
}
