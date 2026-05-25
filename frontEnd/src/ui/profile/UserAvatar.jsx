import styles from "./UserAvatar.module.css";
import { LuCamera } from "react-icons/lu";

const SIZES = ["sm", "md", "lg", "xl"];

export default function UserAvatar({
  user,
  size = "md",
  className = "",
  showName = false,
  readOnly = false,
  onClick,
  children,
}) {
  const sizeClass = SIZES.includes(size) ? styles[size] : styles.md;
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} ${!readOnly || onClick ? styles.clickable : ""} ${className}`}
        onClick={onClick}
      >
        <div className={`${styles.avatarWrapper} ${sizeClass}`}>
          {user?.profilePicture ? (
            <img
              className={styles.img}
              src={user.profilePicture}
              alt={`${user?.firstName || "User"}'s avatar`}
            />
          ) : (
            <div className={styles.placeholder}>
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
          )}
          {children}
          </div>

        {showName && fullName && <p className={styles.name}>{fullName}</p>}
      </div>
    </div>
  );
}
