import { getShortWeekday } from "@/utils/handleDate";
import styles from "./AvailableSlots.module.css";
import { LuSun, LuMoon } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


export default function AvailableSlotsTable({ isMyFarm, nextWeekAvailability = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleSlotClick(date, slot) {
    if(isMyFarm) return toast.error("You can't book your own farm");
    const searchParams = new URLSearchParams();
    searchParams.set("date", date); 
    searchParams.set("slot", slot);
    navigate(`/app/create-booking/${id}?${searchParams.toString()}`);
  }


  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Day</th>
          <th>Morning</th>
          <th>Evening</th>
        </tr>
      </thead>

      <tbody>
        {nextWeekAvailability.map((availability, i) => {
          return (
            <tr key={i}>
              <td className={styles.dayName}>
                {getShortWeekday(availability.date)}
              </td>

              {["morning", "evening"].map((slot) => {
                const isActive = availability[slot] === "available";

                const Icon = slot === "morning" ? LuSun : LuMoon;

                return (
                  <td key={slot}>
                    <button
                      className={`${styles.slot} ${
                        isActive ? styles.active : ""
                      }`}
                      disabled={!isActive}
                      onClick={() => handleSlotClick(availability.date, slot)}
                    >
                      <span
                        className={`${styles.icon} ${
                          slot === "morning"
                            ? styles.morningIcon
                            : styles.eveningIcon
                        }`}
                      >
                        <Icon size={14} />
                      </span>

                      {slot.charAt(0).toUpperCase() + slot.slice(1)}
                    </button>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
