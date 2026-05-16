import styles from "./ImagesSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function ImagesSkeleton() {
  return (
    <Skeleton className={`${styles.images} ${styles.overlay}`} />
  );
}
