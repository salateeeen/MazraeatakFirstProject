import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./OwnerLayout.module.css";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSide from "../components/DashboardSide";
import { MdSpaceDashboard, MdOutlineVilla, MdAddCircleOutline, MdEventNote, MdNotificationsActive, MdSettings, MdStar } from "react-icons/md";

const ownerNav = [
  { path: "/owner/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
  { path: "/owner/my-farms", label: "My Farms", icon: MdOutlineVilla },
  { path: "/owner/add-farm", label: "Add Farm", icon: MdAddCircleOutline },
  { path: "/owner/bookings", label: "Bookings", icon: MdEventNote },
  { path: "/owner/reviews", label: "Reviews", icon: MdStar },
  { path: "/owner/notifications", label: "Notifications", icon: MdNotificationsActive },
];

export default function OwnerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isSidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <DashboardSide items={ownerNav} isOpen={isSidebarOpen} />
        <main className={styles.main}>
          <DashboardHeader
            title="Owner Portal"
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          />
          <div className={styles.content}>
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
