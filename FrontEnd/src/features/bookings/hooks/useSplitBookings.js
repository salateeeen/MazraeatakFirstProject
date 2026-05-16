export function useSplitBookings(bookings = []) {
  return {
    past: bookings.filter(b => b.status === 'cancelled' || b.status === 'completed'),
    upcoming: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed')
  };
}
