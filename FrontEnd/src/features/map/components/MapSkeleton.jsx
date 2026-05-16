import styles from "./MapSkeleton.module.css";
import Skeleton from "@/ui/skeleton/Skeleton";

export default function MapSkeleton() {
  return <Skeleton className={styles.mapSkeleton} />;
}
