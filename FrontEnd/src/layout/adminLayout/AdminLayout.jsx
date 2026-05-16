import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSide from "../components/DashboardSide";
import { MdSpaceDashboard, MdPeople, MdPersonAdd, MdLocationCity, MdCategory, MdOutlineRoomService } from "react-icons/md";

const adminNav = [
  { path: "/admin/dashboard", label: "Overview", icon: MdSpaceDashboard },
  { path: "/admin/pending-owners", label: "Pending Owners", icon: MdPersonAdd },
  { path: "/admin/users", label: "Users", icon: MdPeople },
  { path: "/admin/cities", label: "Cities", icon: MdLocationCity },
  { path: "/admin/categories", label: "Categories", icon: MdCategory },
  { path: "/admin/facilities", label: "Facilities", icon: MdOutlineRoomService },
];

export default function AdminLayout() {
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
        <DashboardSide items={adminNav} isOpen={isSidebarOpen} />
        <main className={styles.main}>
          <DashboardHeader
            title="Admin Portal"
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
