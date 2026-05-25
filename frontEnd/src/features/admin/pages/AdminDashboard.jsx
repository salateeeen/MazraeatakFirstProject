import styles from "./AdminDashboard.module.css";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import StatsCard from "../../../ui/statsCard/StatsCard";
import {
  MdPeople,
  MdLandscape,
  MdBookmark,
  MdVerifiedUser,
} from "react-icons/md";
import { RiPassPendingLine } from "react-icons/ri";

import Spinner from "@/ui/spinner/Spinner";
import Title from "@/ui/title/Title";

export default function AdminDashboard() {
  const { data: dashboardData, isPending: fetchingDashboard, error } = useAdminDashboard();
  if (fetchingDashboard) return <Spinner />;
  if (error) return <div className={styles.error}>{error.message}</div>;

  const stats = dashboardData?.data || {};

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <header><Title size="xxl" subtitle="Welcome back! Here is what's happening with Mazreatak today.">
          Admin Overview
        </Title></header>
      </header>

      <div className={styles.grid}>
        <StatsCard
          label="Total Users"
          value={stats.usersCount}
          hint="All registered accounts"
          icon={MdPeople}
          color="blue"
        />
        <StatsCard
          label="Pending Owners"
          value={stats.pendingOwnersCount}
          hint="Pending owner requests"
          icon={RiPassPendingLine}
          color="red"
        />
        <StatsCard
          label="Active Owners"
          value={stats.activeOwnersCount}
          hint="Verified farm managers"
          icon={MdVerifiedUser}
          color="green"
        />
        <StatsCard
          label="Total Farms"
          value={stats.farmsCount}
          hint="Farms listed on platform"
          icon={MdLandscape}
          color="yellow"
        />
        <StatsCard
          label="Total Bookings"
          value={stats.bookingsCount}
          hint="Lifetime processed bookings"
          icon={MdBookmark}
          color="indigo"
        />
      </div>

      {stats.pendingOwnersCount > 0 && (
        <div className={styles.alert}>
          <div className={styles.alertContent}>
            <p>
              You have <strong>{stats.pendingOwnersCount}</strong> pending owner
              requests waiting for your approval.
            </p>
            <button className={styles.alertAction}>Review Requests</button>
          </div>
        </div>
      )}
    </div>
  );
}
