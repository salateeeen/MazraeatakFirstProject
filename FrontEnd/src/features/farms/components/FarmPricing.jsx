import { convertMinutesToClockTime } from "@/utils/handleDate";
import styles from "./FarmPricing.module.css";
import Title from "@/ui/title/Title";
import { MdWbSunny, MdNightsStay, MdAccessTime } from "react-icons/md";

const SLOT_CONFIG = {
  morning: {
    label: "Morning",
    Icon: MdWbSunny,
    className: "morning",
  },
  evening: {
    label: "Evening",
    Icon: MdNightsStay,
    className: "evening",
  },
  fullDay: {
    label: "Full Day",
    Icon: MdAccessTime,
    className: "fullDay",
  },
};

export default function FarmPricing({ pricing, timeSlots }) {
  return (
    <section className={styles.card}>
      <Title mb="2rem" size="lg" className={styles.title}>
        Pricing & Time Slots
      </Title>

      <div className={styles.comparisonTable}>
        <div className={styles.tableHeader}>
          <div className={styles.emptyHeader}></div>
          <div className={styles.dayHeader}>Weekdays</div>
          <div className={styles.dayHeader}>Weekend</div>
        </div>

        {["morning", "evening", "fullDay"].map((slot) => {
          const { label, Icon, className } = SLOT_CONFIG[slot];
          return (
            <div key={slot} className={`${styles.slotRow} ${styles[className]}`}>
              <div className={styles.slotInfo}>
                <div className={styles.iconWrapper}>
                  <Icon size={18} />
                </div>
                <span className={styles.slotLabel}>{label}</span>
              </div>

              {["weekday", "weekend"].map((type) => (
                <div key={type} className={styles.priceCard}>
                  <div className={styles.timeSection}>
                    <MdAccessTime size={12} className={styles.timeIcon} />
                    <span>
                      {convertMinutesToClockTime(timeSlots?.[slot]?.from)} –{" "}
                      {convertMinutesToClockTime(timeSlots?.[slot]?.to)}
                    </span>
                  </div>
                  <div className={styles.priceSection}>
                    <span className={styles.currency}>JOD</span>
                    <span className={styles.amount}>
                      {pricing?.[type]?.[slot]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
