import styles from "./RecentBookings.module.css";
import Title from "@/ui/title/Title";
import StatusBadge from "./StatusBadge";
import Empty from "@/ui/empty/Empty";
import Button from "@/ui/button/Button";
import { useConfirmBooking } from "@/features/bookings/hooks/useConfirmBooking";
import { useCancelBooking } from "@/features/bookings/hooks/useCancelBooking";
import { LuCalendarDays, LuClock } from "react-icons/lu";

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function getInitials(user) {
  if (!user) return "??";
  return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
}

export default function RecentBookings({ recentBookings = [], title = "Recent Bookings" }) {
  const { mutate: confirmMutation, isPending: isConfirming, variables: confirmingId } = useConfirmBooking();
  const { mutate: cancelMutation, isPending: isCanceling, variables: cancelingId } = useCancelBooking();


  const handleConfirmBooking = (bookingId) => {
    confirmMutation(bookingId);
  };

  const handleCancelBooking = (bookingId) => {
    cancelMutation(bookingId);
  };

  return (
    <section className={styles.section}>
      <header><Title size="lg" mb="1.2rem">
        {title}
      </Title></header>
      
      {recentBookings.length === 0 ? (
        <Empty title="No Bookings" message="You don't have any bookings yet." />
      ) : (
        <ul className={styles.list}>
          {recentBookings.map((b) => (
            <li key={b._id} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {getInitials(b.user)}
                  </div>
                  <div className={styles.textGroup}>
                    <span className={styles.itemName}>
                      {b.user?.firstName} {b.user?.lastName}
                    </span>
                    <span className={styles.farmName}>{b.farm?.farmName}</span>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className={styles.itemMeta}>
                <div className={styles.metaItem}>
                  <LuCalendarDays size={14} />
                  <span>{formatDate(b.date)}</span>
                </div>
                <div className={styles.metaItem}>
                  <LuClock size={14} />
                  <span>{b.timeSlot}</span>
                </div>
              </div>

              {b.status === "pending" && (
                <div className={styles.actions}>
                  <Button
                    className={styles.confirmBtn}
                    onClick={() => handleConfirmBooking(b._id)}
                    isPending={isConfirming && confirmingId === b._id}
                    disabled={isCanceling}
                  >
                    Confirm
                  </Button>
                  <Button
                    className={styles.cancelBtn}
                    onClick={() => handleCancelBooking(b._id)}
                    isPending={isCanceling && cancelingId === b._id}
                    disabled={isConfirming}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
