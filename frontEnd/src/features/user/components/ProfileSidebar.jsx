import React from "react";
import { LuUser, LuLayoutDashboard, LuSettings, LuLogOut } from "react-icons/lu";
import Side from "@/ui/side/Side";
import styles from "./ProfileSidebar.module.css";

export default function ProfileSidebar({ onNavigate, userRole, targetId }) {
  const sidebarItems = [
    {
      path: `/app/profile/${targetId || ""}`,
      label: "Profile",
      icon: LuUser
    },
    {
      path: userRole === "owner" ? "/owner/dashboard" : (userRole === "admin" ? "/admin/dashboard" : "/app/home"),
      label: "Dashboard",
      icon: LuLayoutDashboard
    },
    {
      path: "/app/settings/account",
      label: "Settings",
      icon: LuSettings
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSticky}>
        <div className={styles.sidebarHeader}>
          <span className={styles.brandDot}></span>
          <h3 className={styles.brandTitle}>Account</h3>
        </div>
        
        <Side items={sidebarItems} iconIN="start" className={styles.sidebarList} />
        
        <div className={styles.navDivider}></div>
        
        <button 
          className={`${styles.navItem} ${styles.logoutBtn}`}
          onClick={() => onNavigate("logout")}
        >
          <LuLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
