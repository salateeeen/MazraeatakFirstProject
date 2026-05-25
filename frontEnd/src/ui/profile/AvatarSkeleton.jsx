import styles from "./UserAvatar.module.css";
import Skeleton from "../skeleton/Skeleton";

export default function AvatarSkeleton({ size = "md", className = "" }) {
  const sizeClass = styles[size] || styles.md;

  return (
    <div className={`${styles.avatar} ${sizeClass} ${className}`}>
      <Skeleton type="circle" width="100%" height="100%" />
    </div>
  );
}
