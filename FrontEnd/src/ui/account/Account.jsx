import styles from "./Account.module.css";
import { useRef } from "react";
import {
  LuLogOut,
  LuUser,
  LuSettings,
  LuMoon,
  LuSun,
  LuLayoutDashboard,
  LuCamera,
} from "react-icons/lu";
import Button from "../button/Button";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/context/useDarkModeToggle";
import { useRole } from "@/hooks/useRole";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import UserAvatar from "../profile/UserAvatar";
import AvatarSkeleton from "../profile/AvatarSkeleton";
import DropDown from "../dropDown/DropDown";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectUser,
  selectUserLoading,
  selectUserError,
  selectUserFullName,
} from "@/features/user/userSlice";
import Modal from "../modal/Modal";
import ChangeProfilePicture from "../profile/ChangeProfilePicture";

export default function Account() {
  const containerRef = useRef();
  const ChangeProfileRef = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useCloseComponents(containerRef);
  const [changeProfileOpen, setChangeProfileOpen] =
    useCloseComponents(ChangeProfileRef);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const userData = useSelector(selectUser);
  const fullName = useSelector(selectUserFullName);
  const fetchingUser = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const { isAdmin, isOwner, isUser } = useRole();

  const dispatch = useDispatch();

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function handleSettings() {
    setIsOpen(false);
    navigate("/app/settings/account");
  }

  const handleRequestOwner = () => {
    navigate("/app/settings/request-owner");
  };

  function handleOwnerDashboard() {
    setIsOpen(false);
    navigate("/owner/dashboard");
  }

  function handleAdminDashboard() {
    setIsOpen(false);
    navigate("/admin/dashboard");
  }

  if (fetchingUser) {
    return (
      <div className={styles.container} ref={containerRef}>
        <div className={styles.profile}>
          <AvatarSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.profile} onClick={handleOpen}>
          {error ? (
            <div className={styles.errorCircle}>Error</div>
          ) : (
            <UserAvatar user={userData} />
          )}
        </div>

        {isOpen && (
          <DropDown className={`${styles.dropdown}`}>
            <div className={styles.avatarLarge}>
              <UserAvatar user={userData} size="md" showName={false}>
                <div className={styles.overlay} onClick={() => setChangeProfileOpen(true)}>
                  <LuCamera size={24} />
                </div>
              </UserAvatar>
            </div>

            <p className={styles.name}>{fullName}</p>

            <div className={styles.divider} />

            <button className={styles.item}>
              <LuUser size={16} />
              View profile
            </button>

            <button className={styles.item} onClick={handleSettings}>
              <LuSettings size={16} />
              Account settings
            </button>

            {isUser && (
              <button className={styles.item} onClick={handleRequestOwner}>
                <FaRegArrowAltCircleUp size={16} />
                Request Owner
              </button>
            )}

            {isOwner && (
              <button className={styles.item} onClick={handleOwnerDashboard}>
                <LuLayoutDashboard size={16} />
                Owner dashboard
              </button>
            )}

            {isAdmin && (
              <button className={styles.item} onClick={handleAdminDashboard}>
                <LuLayoutDashboard size={16} />
                Admin dashboard
              </button>
            )}

            <button className={styles.item} onClick={toggleDarkMode}>
              {isDarkMode ? <LuSun size={16} /> : <LuMoon size={16} />}
              {isDarkMode ? "Light mode" : "Dark mode"}
            </button>

            <div className={styles.divider} />

            <Button className={styles.logout} onClick={handleLogout}>
              <LuLogOut size={16} />
              Logout
            </Button>
          </DropDown>
        )}
      </div>
      {changeProfileOpen && (
        <Modal
          setOpen={setChangeProfileOpen}
          ref={ChangeProfileRef}
        >
          <ChangeProfilePicture user={userData} setOpen={setChangeProfileOpen} />
        </Modal>
      )}
    </>
  );
}
