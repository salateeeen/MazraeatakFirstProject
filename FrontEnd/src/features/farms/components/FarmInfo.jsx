import { LuMapPin, LuUsers, LuBed } from "react-icons/lu";
import Stars from "@/ui/stars/Stars";
import styles from "./FarmInfo.module.css";
import { TbRulerMeasure } from "react-icons/tb";

export default function FarmInfo({ className, farm }) {
  return (
    <section className={`${styles.card} ${className}`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{farm.farmName}</h2>

        <div className={styles.rating}>
          <Stars rating={farm.ratingsAverage} />
          <span>{farm.ratingsQuantity} reviews</span>

          {farm.category && (
            <span className={styles.category}>{farm.category.name}</span>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <LuMapPin size={16} />
          <span>{farm.city.name}</span>
        </div>

        <div className={styles.infoItem}>
          <LuUsers size={16} />
          <span>{farm.maximumGuests} Guests</span>
        </div>

        <div className={styles.infoItem}>
          <LuBed size={16} />
          <span>{farm.numberOfRooms} Rooms</span>
        </div>
        <div className={styles.infoItem}>
          <TbRulerMeasure size={16} />
          <span>{farm.area}m²</span>
        </div>
      </div>

      <div className={styles.facilities}>
        {farm.facilities?.map((facility) => (
          <span key={facility._id} className={styles.chip}>
            {facility.name}
          </span>
        ))}
      </div>
    </section>
  );
}
