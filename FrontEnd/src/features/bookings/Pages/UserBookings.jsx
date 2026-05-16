import { useBookings } from "../hooks/useBookings";
import Bookings from "../components/Bookings";

export default function UserBookings() {
  const {
    data: bookingsData,
    error,
    isPending: fetchingBookings,
  } = useBookings();

  const bookings = bookingsData?.data || [];

  return (
    <div>
      <Bookings
        data={bookings}
        fetchingBookings={fetchingBookings}
        error={error}
      />
    </div>
  );
}
