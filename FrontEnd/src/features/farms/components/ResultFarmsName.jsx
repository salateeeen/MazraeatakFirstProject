import { MdOutlineVilla } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./ResultFarmsName.module.css";

export default function ResultFarmsName({ item }) {
  if (!item) return null;

  return (
    <div className={styles.container}>
      <div className={styles.farmsName}>
        <MdOutlineVilla className={styles.icon} /> 
        <span>{item.farmName || item.name}</span>
      </div>
      <div className={styles.city}>
        <FaLocationDot className={styles.icon} /> 
        <span>{item.city?.name || item.cityName || "N/A"}</span>
      </div>
    </div>
  );
}
