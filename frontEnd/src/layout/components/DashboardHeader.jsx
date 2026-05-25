import styles from "./DashboardHeader.module.css";
import { MdMenu } from "react-icons/md";
import UserAvatar from "@/ui/profile/UserAvatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

export default function DashboardHeader({ title = "Dashboard", onMenuClick }) {
  const user = useSelector(selectUser);
  
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <MdMenu size={28} />
        </button>
        <h2>{title}</h2>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <UserAvatar user={user} readOnly className={styles.profilePicture} />
        </button>
      </div>
    </header>
  );
}
