import styles from "./BookingCard.module.css";
import { formatToShortDate } from "@/utils/handleDate";

import { LuBadgeDollarSign, LuPhone, LuStar, LuCalendarDays, LuX, LuCheck } from "react-icons/lu";

import { FaLocationDot } from "react-icons/fa6";
import { LuSun, LuMoon, LuClock } from "react-icons/lu";

import Rate from "@/features/reviews/components/Rate";
import Modal from "@/ui/modal/Modal";
import Map from "@/features/map/components/Map";

export default function BookingCard({
  data,
  onRate,
  onCall,
  onCancel,
  onComplete,
  onMap,
  rateRef,
  mapRef,
  openRate,
  openMap,
  setOpenRate,
  setOpenMap
}) {
  const { farm, date, timeSlot, price, status, _id: bookingId } = data;
  const { farmName, _id: farmId, coverImage } = farm;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={coverImage} alt={farmName} />
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.title}>{farmName.toUpperCase()}</h3>

            <div className={styles.status}>
              <span className={`${styles.dot} ${styles[status]}`} />
              <span>{status}</span>
            </div>
          </div>

          <div className={styles.dates}>
            <div className={styles.date}>
              <LuCalendarDays size={20} />
              <span>{formatToShortDate(date)}</span>
            </div>

            <span
              className={`${styles.slot} ${
                styles[timeSlot?.toLowerCase().replace(" ", "")]
              }`}
            >
              {timeSlot === "morning" && (
                <LuSun size={16} style={{ marginRight: 6 }} />
              )}
              {timeSlot === "fullDay" && (
                <LuClock size={16} style={{ marginRight: 6 }} />
              )}
              {timeSlot === "evening" && (
                <LuMoon size={16} style={{ marginRight: 6 }} />
              )}
              {timeSlot}
            </span>
          </div>

          <div className={styles.price}>
            <LuBadgeDollarSign size={20} />
            <span>{price} JD</span>
          </div>

          <div className={styles.actions}>
            {status === "completed" && (
              <button
                className={styles.rateBtn}
                onClick={(e) => onRate(e, bookingId)}
              >
                <LuStar size={16} />
                Rate
              </button>
            )}

            {status !== "completed" && (
              <button
                className={styles.callBtn}
                onClick={(e) => onCall(e, bookingId)}
              >
                <LuPhone size={16} />
                Call
              </button>
            )}

            <button
              className={styles.locationBtn}
              onClick={(e) => onMap(e, bookingId)}
            >
              <FaLocationDot size={16} />
              Location
            </button>

            {status === "pending" && (
              <button
                className={styles.cancelBtn}
                onClick={(e) => onCancel(e, bookingId)}
              >
                <LuX size={16} strokeWidth={5} />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {openRate && (
        <Modal ref={rateRef} className={styles.rateModal} setOpen={setOpenRate}>
          <Rate
            open={openRate}
            setOpen={setOpenRate}
            farmName={farmName}
            farmId={farmId}
          />
        </Modal>
      )}

      {openMap && (
        <Modal ref={mapRef} full setOpen={setOpenMap}>
          <Map markers={farm?.location?.coordinates}/>
        </Modal>
      )}
    </>
  );
}
