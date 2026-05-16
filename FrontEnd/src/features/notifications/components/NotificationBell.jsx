import { useRef } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useMarkAsRead } from "@/features/notifications/hooks/useMarkAsRead";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import NotificationCard from "@/features/notifications/components/NotificationCard";
import { useDeleteNotification } from "@/features/notifications/hooks/useDeleteNotification";
import Spinner from "@/ui/spinner/Spinner";
import styles from "./NotificationBell.module.css";
import { useNavigate } from "react-router-dom";

import DropDown from "@/ui/dropDown/DropDown";

export default function NotificationBell({className}) {
  const navigate = useNavigate();
  const { data: notificationsData, isPending } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();
  
  const bellRef = useRef(null);
  const [isOpen, setIsOpen] = useCloseComponents(bellRef);

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleToggle = () => setIsOpen((open) => !open);

  const handleSeeAll = () => {
    setIsOpen(false);
    navigate("/app/notifications");
  };

  return (
    <div className={styles.container} ref={bellRef}>
      <div className={styles.bellWrapper} onClick={handleToggle}>
        <MdOutlineNotificationsNone className={`${styles.icon} ${className}`}/>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </div>

      {isOpen && (
        <DropDown className={styles.dropdown}>
          <header className={styles.header}>
            <h3>Notifications</h3>
            {unreadCount > 0 && <span className={styles.unreadTag}>{unreadCount} unread</span>}
          </header>

          <div className={styles.list}>
            {isPending ? (
              <div className={styles.center}>
                <Spinner size="sm" />
              </div>
            ) : notifications.length === 0 ? (
              <p className={styles.empty}>No notifications yet</p>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))
            )}
          </div>

          <button className={styles.footer} onClick={handleSeeAll}>
            See all notifications
          </button>
        </DropDown>
      )}
    </div>
  );
}
