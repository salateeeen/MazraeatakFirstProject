import { capitalizeFirstLetter } from "@/utils/handleStrings";
import styles from "./CityCard.module.css";

export default function CityCard({ city, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={`${city.image || "/photo.jpeg"}`} alt={city.name} />
      <div className={styles.overlay}>
        <p>{capitalizeFirstLetter(city.name)}</p>
      </div>
    </div>
  );
}
