import { capitalizeFirstLetter } from "@/utils/handleStrings";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ category, onClick }) {
  
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={`${category.image || "/photo.jpeg"}`} alt={category.name} />
      </div>
      <div className={styles.overlay}>
        <p>{capitalizeFirstLetter(category.name)}</p>
      </div>
    </div>
  );
}
