import React from "react";
import { LuCamera, LuSettings, LuMail, LuCalendarDays } from "react-icons/lu";
import UserAvatar from "@/ui/profile/UserAvatar";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader({
  profileUser,
  fullName,
  email,
  userRole,
  joinedDate,
  isOwnProfile,
  onEditAvatar,
  onEditProfile
}) {
  return (
    <section className={styles.headerSection}>
      <div className={styles.coverBanner}>
        <div className={styles.bannerOverlay}></div>
      </div>
      
      <div className={styles.headerDetails}>
        <div className={styles.avatarContainer}>
          <UserAvatar 
            user={profileUser} 
            size="xl" 
            readOnly={!isOwnProfile}
            onClick={isOwnProfile ? onEditAvatar : undefined}
            className={styles.profileAvatar}
          >
            {isOwnProfile && (
              <div className={styles.avatarEditOverlay}>
                <LuCamera size={22} />
              </div>
            )}
          </UserAvatar>
        </div>
        
        <div className={styles.infoWrapper}>
          <div className={styles.nameAndBadge}>
            <h1 className={styles.userName}>{fullName}</h1>
            <span className={`${styles.roleBadge} ${userRole === "owner" ? styles.ownerBadge : styles.customerBadge}`}>
              {userRole === "owner" ? "Owner" : "Customer"}
            </span>
          </div>
          
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <LuMail size={16} />
              <span>{email}</span>
            </span>
            <span className={styles.metaItem}>
              <LuCalendarDays size={16} />
              <span>Joined {joinedDate}</span>
            </span>
          </div>
        </div>

        {isOwnProfile && (
          <button 
            className={styles.editProfileBtn}
            onClick={onEditProfile}
          >
            <LuSettings size={16} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>
    </section>
  );
}
