import Button from "@/ui/button/Button.jsx";
import styles from "./BookingCTA.module.css";
import AvailableSlots from "@/ui/availableSlots/AvailableSlots";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "@/features/user/userSlice";

export default function BookingCTA({farmOwnerId, nextWeekAvailability = [] }) {
  const myId = useSelector(selectUserId);
  const navigate = useNavigate();
  const { id } = useParams();

  const isMyFarm = myId === farmOwnerId;
  
  function handleBooking() {
    navigate(`/app/create-booking/${id}`);
  }

  return (
    <section className={styles.card}>
      <h3>Ready to book?</h3>
      <p>Secure your spot before it's taken.</p>
      <div className={styles.body}>
        <AvailableSlots isMyFarm={isMyFarm} nextWeekAvailability={nextWeekAvailability} />
        {!isMyFarm && <Button onClick={handleBooking}>Book Now</Button>}
      </div>
    </section>
  );
}
