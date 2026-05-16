import { useRef } from "react";
import styles from "./BookingsList.module.css";
import BookingCardSkeleton from "./BookingCardSkeleton";
import BookingCard from "./BookingCard";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { useCancelBooking } from "../hooks/useCancelBooking";
import Empty from "@/ui/empty/Empty";
import Error from "@/ui/error/Error";
import { useConfirm } from "@/context/ConfirmContext";

export default function BookingsList({
  data,
  isPending,
  error,
  skeletonCount,
}) {
  const rateRef = useRef(null);
  const mapRef = useRef(null);
  const [openRate, setOpenRate] = useCloseComponents(rateRef);
  const [openMap, setOpenMap] = useCloseComponents(mapRef);
  const { mutate: cancleBooking, isPending: canclingBooking } = useCancelBooking();
  const confirm = useConfirm();

  if (isPending) {
    return (
      <div className={styles.list}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <Error message={error.message} />;

  const bookings = data || [];
  if (bookings.length === 0) {
    return (
      <Empty
        title="No bookings yet"
        message="Start booking amazing farm experiences!"
      />
    );
  }

  const handleRate = (e) => {
    e.stopPropagation();
    setOpenRate(true);
  };

  const handleCall = (e) => {
    e.stopPropagation();
  };

  const handleMap = (e) => {
    e.stopPropagation();
    setOpenMap(true);
  };

  const handleCancel = async (e, id) => {
    e.stopPropagation();
    const isConfirmed = await confirm({
      title: "Cancel Booking",
      message:
        "Are you sure you want to cancel this booking? This action cannot be undone.",
      confirmLabel: "Yes, Cancel Booking",
      danger: true,
    });

    if (isConfirmed) cancleBooking(id);
  };

 

  return (
    <div className={`${styles.list} ${styles.shadow}`}>
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          data={booking}
          onRate={handleRate}
          onCall={handleCall}
          onCancel={handleCancel}
          onMap={handleMap}
          rateRef={rateRef}
          mapRef={mapRef}
          openMap={openMap}
          openRate={openRate}
          setOpenRate={setOpenRate}
          setOpenMap={setOpenMap}
        />
      ))}
    </div>
  );
}
