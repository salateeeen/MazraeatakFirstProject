import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Custom hook & Redux actions
import { useProfileData } from "../hooks/useProfileData";
import { logout } from "@/features/user/userSlice";

// Modular subcomponents
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileTimeline from "../components/ProfileTimeline";
import ProfileActions from "../components/ProfileActions";

// UI components
import Modal from "@/ui/modal/Modal";
import ChangeProfilePicture from "@/ui/profile/ChangeProfilePicture";
import Spinner from "@/ui/spinner/Spinner";
import Error from "@/ui/error/Error";

// Styles
import styles from "./Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [changeProfileOpen, setChangeProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const {
    profileUser,
    isOwnProfile,
    isPending,
    error,
    fullName,
    email,
    userRole,
    joinedDate,
    targetId,
    stats,
    activities
  } = useProfileData();

  if (isPending) {
    return (
      <div className={styles.loaderContainer}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Error title="Failed to load profile" message={error?.message || "User profile not found."} />
      </div>
    );
  }

  // Sidebar navigation actions
  const handleSidebarNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") {
      navigate(userRole === "owner" ? "/owner/dashboard" : (userRole === "admin" ? "/admin/dashboard" : "/app/home"));
    } else if (tab === "settings") {
      navigate("/app/settings/account");
    } else if (tab === "logout") {
      dispatch(logout());
      navigate("/login");
    }
  };

  // Quick Action card actions
  const handleQuickAction = (action) => {
    if (action === "dashboard") {
      navigate(userRole === "owner" ? "/owner/dashboard" : (userRole === "admin" ? "/admin/dashboard" : "/app/home"));
    } else if (action === "add-farm") {
      navigate("/owner/add-farm");
    } else if (action === "bookings") {
      navigate(userRole === "owner" ? "/owner/bookings" : "/app/bookings");
    } else if (action === "settings") {
      navigate("/app/settings/account");
    } else if (action === "browse") {
      navigate("/app/home");
    } else if (action === "favorites") {
      navigate("/app/favorites");
    }
  };

  return (
    <div className={styles.profilePage}>
      {/* Sidebar Navigation */}
      <ProfileSidebar 
        activeTab={activeTab} 
        onNavigate={handleSidebarNavigation} 
        userRole={userRole} 
        targetId={targetId}
      />

      {/* Main Content Area */}
      <main className={styles.content}>
        {/* Cover & Avatar Header */}
        <ProfileHeader
          profileUser={profileUser}
          fullName={fullName}
          email={email}
          userRole={userRole}
          joinedDate={joinedDate}
          isOwnProfile={isOwnProfile}
          onEditAvatar={() => setChangeProfileOpen(true)}
          onEditProfile={() => navigate("/app/settings/account")}
        />

        {/* Quick Stats Grid */}
        <ProfileStats userRole={userRole} stats={stats} />

        {/* Feed & Quick Actions row */}
        <div className={styles.sectionsLayout}>
          {/* Recent Activity Timeline */}
          <ProfileTimeline activities={activities} />

          {/* Quick Actions Panel */}
          {isOwnProfile && (
            <ProfileActions userRole={userRole} onActionClick={handleQuickAction} />
          )}
        </div>
      </main>

      {/* Profile Picture Upload Modal */}
      {changeProfileOpen && (
        <Modal setOpen={setChangeProfileOpen}>
          <ChangeProfilePicture
            user={profileUser}
            setOpen={setChangeProfileOpen}
          />
        </Modal>
      )}
    </div>
  );
}