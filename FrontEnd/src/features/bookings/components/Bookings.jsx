import styles from "./Bookings.module.css";
import Container from "@/ui/container/Container";
import { useBookings } from "../hooks/useBookings";
import BookingsList from "../components/BookingsList";
import { useSplitBookings } from "../hooks/useSplitBookings";
import Title from "@/ui/title/Title";

export default function Bookings({data, fetchingBookings, error}) {
  const { past, upcoming } = useSplitBookings(data);
  
  return (
    <Container className={styles.container}>
      <div className={styles.bookings}>
        <Title size="lg" mb="1rem">Previous Bookings</Title>
        <BookingsList
          data={past}
          isPending={fetchingBookings}
          error={error}
          skeletonCount={3}
        />
      </div>

      <div className={styles.bookings}>
        <Title size="lg" mb="1rem">Upcoming Bookings</Title>
        <BookingsList
          data={upcoming}
          isPending={fetchingBookings}
          error={error}
          skeletonCount={1}
        />
      </div>
    </Container>
  );
}
