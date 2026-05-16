import styles from "./OwnerDashboard.module.css";
import { useOwnerDashboard } from "../hooks/useOwnerDashboard";
import StatsCard from "../../../ui/statsCard/StatsCard";
import { MdLandscape, MdBookmark, MdNotifications, MdAttachMoney } from "react-icons/md";
import Spinner from "@/ui/spinner/Spinner";
import Title from "@/ui/title/Title";
import RecentBookings from "@/features/bookings/components/RecentBookings";
import RecentReviews from "@/features/reviews/components/RecentReviews";

export default function OwnerDashboard() {
  const { data: dashboardData, isPending: fetchingDashboard, error } = useOwnerDashboard();

  if (fetchingDashboard) return <Spinner />;

  if (error) {
    return (
      <div className={styles.error}>
        {error.message || "Failed to load owner dashboard"}
      </div>
    );
  }
  
  const payload = dashboardData?.data || {};
  const {
    farmsCount = 0,
    upcomingBookingsCount = 0,
    recentBookings = [],
    recentReviews = [],
    totalEarnings = 0,
    unreadNotifications = 0,
  } = payload;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Title size="xxl" subtitle="Quick overview of your farms, bookings, and recent activity.">
          Owner Dashboard
        </Title>
      </header>

      <div className={styles.grid}>
        <StatsCard 
          label="My Farms" 
          value={farmsCount} 
          hint="Active listings"
          icon={MdLandscape}
          color="blue"
        />
        <StatsCard 
          label="Upcoming" 
          value={upcomingBookingsCount} 
          hint="Bookings to fulfill"
          icon={MdBookmark}
          color="green"
        />
        <StatsCard 
          label="Earnings" 
          value={`${totalEarnings} JOD`} 
          hint="Total revenue"
          icon={MdAttachMoney}
          color="yellow"
        />
        <StatsCard 
          label="Alerts" 
          value={unreadNotifications} 
          hint="Unread updates"
          icon={MdNotifications}
          color="indigo"
        />
      </div>

      <div className={styles.sectionsGrid}>
        <RecentBookings recentBookings={recentBookings} />
        <RecentReviews recentReviews={recentReviews} />
      </div>
    </div>
  );
}
