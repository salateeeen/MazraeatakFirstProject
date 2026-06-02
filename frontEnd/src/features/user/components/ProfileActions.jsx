import React from "react";
import { LuLayoutDashboard, LuPlus, LuSettings, LuChevronRight, LuHeart } from "react-icons/lu";
import { MdBookmark } from "react-icons/md";
import Title from "@/ui/title/Title";
import styles from "./ProfileActions.module.css";

export default function ProfileActions({ userRole, onActionClick }) {
  return (
    <section className={styles.actionsSection}>
      <Title size="lg" mb="1.2rem">Quick Actions</Title>
      <div className={styles.actionsGrid}>
        {userRole === "owner" ? (
          <>
            <div className={styles.actionCard} onClick={() => onActionClick("dashboard")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionBlue}`}>
                  <LuLayoutDashboard size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Go to Dashboard</h4>
              <p className={styles.actionDesc}>Manage bookings, check notifications, and inspect metrics.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("add-farm")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionGreen}`}>
                  <LuPlus size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Add New Farm</h4>
              <p className={styles.actionDesc}>Create a listing to advertise your farm properties.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("bookings")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionGold}`}>
                  <MdBookmark size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>View Bookings</h4>
              <p className={styles.actionDesc}>Review schedules and manage client reservation requests.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("settings")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionDark}`}>
                  <LuSettings size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Account Settings</h4>
              <p className={styles.actionDesc}>Update profile data, contact details, and security.</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.actionCard} onClick={() => onActionClick("browse")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionBlue}`}>
                  <LuLayoutDashboard size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Browse Farms</h4>
              <p className={styles.actionDesc}>Explore farms, check availability, and make bookings.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("bookings")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionGreen}`}>
                  <MdBookmark size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>My Bookings</h4>
              <p className={styles.actionDesc}>Track dates, status details, and call host contacts.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("favorites")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionGold}`}>
                  <LuHeart size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Saved Farms</h4>
              <p className={styles.actionDesc}>Inspect and organize your favorite farm properties.</p>
            </div>

            <div className={styles.actionCard} onClick={() => onActionClick("settings")}>
              <div className={styles.actionHeader}>
                <div className={`${styles.actionIcon} ${styles.actionDark}`}>
                  <LuSettings size={20} />
                </div>
                <LuChevronRight className={styles.arrowIcon} size={18} />
              </div>
              <h4 className={styles.actionTitle}>Account Settings</h4>
              <p className={styles.actionDesc}>Update details, security, and notification settings.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
