import { useOwnerBookings } from "../hooks/useOwnerBookings";
import Bookings from "../components/Bookings";
import RecentBookings from "../components/RecentBookings";

export default function OwnerBookings() {
  const { data: bookingsData, isPending, error } = useOwnerBookings();
  const bookings = bookingsData?.data || [];

  return (
    <div>
     <RecentBookings
        recentBookings={bookings}
     />
    </div>
  );
}
