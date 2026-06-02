import React from "react";
import { LuBadgeDollarSign, LuHeart, LuStar } from "react-icons/lu";
import { MdLandscape, MdBookmark } from "react-icons/md";
import Title from "@/ui/title/Title";
import StatsCard from "@/ui/statsCard/StatsCard";
import styles from "./ProfileStats.module.css";

export default function ProfileStats({ userRole, stats }) {
  const {
    totalFarms,
    totalBookings,
    totalEarnings,
    customerBookings,
    customerFavorites,
    customerReviewsCount
  } = stats;

  return (
    <section className={styles.statsSection}>
      <Title size="lg" mb="1.2rem">Overview</Title>
      <div className={styles.statsGrid}>
        {userRole === "admin" && (
          <>
            <StatsCard
              label="Total Farms"
              value={totalFarms}
              icon={MdLandscape}
              color="blue"
            />
            <StatsCard
              label="Farms Booked"
              value={totalBookings}
              icon={MdBookmark}
              color="green"
            />
            <StatsCard
              label="Total Earnings"
              value={`${totalEarnings} JD`}
              icon={LuBadgeDollarSign}
              fillIcon={false}
              color="yellow"
            />
          </>
        )}

        {userRole === "owner" && (
          <>
            <StatsCard
              label="Total Farms"
              value={totalFarms}
              icon={MdLandscape}
              color="blue"
            />
            <StatsCard
              label="Farms Booked"
              value={totalBookings}
              icon={MdBookmark}
              color="green"
            />
            <StatsCard
              label="Total Earnings"
              value={`${totalEarnings} JD`}
              icon={LuBadgeDollarSign}
              fillIcon={false}
              color="yellow"
            />
          </>
        )}

        {userRole === "user" && (
          <>
            <StatsCard
              label="My Bookings"
              value={customerBookings}
              icon={MdBookmark}
              color="blue"
            />
            <StatsCard
              label="Saved Farms"
              value={customerFavorites}
              icon={LuHeart}
              color="red"
            />
            <StatsCard
              label="Reviews Left"
              value={customerReviewsCount}
              icon={LuStar}
              color="yellow"
            />
          </>
        )}
      </div>
    </section>
  );
}
