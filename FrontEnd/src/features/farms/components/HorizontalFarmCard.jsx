import styles from "./HorizontalFarmCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { memo } from "react";
import FavoriteButton from "@/ui/icons/FavoriteButton";
import DeleteButton from "@/ui/icons/DeleteButton";
import { HiOutlineMapPin } from "react-icons/hi2";
import { TbRulerMeasure } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import EditButton from "@/ui/icons/EditButton";
import { useSelector } from "react-redux";
import { selectUserId } from "@/features/user/userSlice";

function HorizontalFarmCard({ farm, favorites = [], onDelete, isDeleting }) {
  const navigate = useNavigate();
  const myId = useSelector(selectUserId);
  const {
    farmName,
    farmOwner,
    city,
    category,
    facilities,
    coverImage,
    oldPrice,
    _id: id,
    maximumGuests,
    ratingsAverage: rating,
    ratingsQuantity: reviews,
    area,
    numberOfRooms,
    description,
    basePrice,
  } = farm;


  
  const isMyFarms = myId === farmOwner;

  function handleNavigate() {
    navigate(`/app/farm/${id}`);
  }

  const token = localStorage.getItem("token");
  const showDeleteEdit = Boolean(token && isMyFarms);
  const showFavorite = Boolean(token && !isMyFarms);
  const isFavorite = favorites.includes(id);

  return (
    <div onClick={handleNavigate} className={styles.card}>
      {showDeleteEdit && (
        <div className={styles.deleteEdit}>
          <EditButton resourceName={farmName} id={id} />
          <DeleteButton resourceName={farmName} id={id} onDelete={onDelete} isPending={isDeleting} />
        </div>
      )}
      {showFavorite && (
        <FavoriteButton id={id} isFavorite={isFavorite} absolute />
      )}

      <div className={styles.img}>
        <img src={coverImage} alt={farmName} />
      </div>

      <div className={styles.info}>
        {category && <span className={styles.badge}>{category.name}</span>}
        <h3 className={styles.name}>{farmName}</h3>

        <div className={styles.location}>
          <HiOutlineMapPin />
          {city.name}
        </div>

        <div className={styles.ratingRow}>
          <span className={styles.ratingBox}>{rating}</span>
          <div>
            <div className={styles.ratingText}>Excellent</div>
            <div className={styles.reviews}>
              {reviews.toLocaleString()} verified reviews
            </div>
          </div>
        </div>
        <p className={styles.desc}>{description}</p>
        <div className={styles.metaSection}>
          <div className={styles.meta}>
            <span>
              <FiUsers /> {maximumGuests} guests
            </span>
            <span>
              <LuBedDouble /> {numberOfRooms} rooms
            </span>
            <span>
              <TbRulerMeasure /> {area}m²
            </span>
            {facilities?.slice(0, 3).map((facility) => (
              <span key={facility._id}>
                {facility.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.priceBox}>
          {oldPrice && <span className={styles.oldPrice}>JOD {oldPrice}</span>}
          <span className={styles.pricePerNights}>
            <span className={styles.price}>JOD {basePrice}</span>
            <span className={styles.nights}>/ day</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(HorizontalFarmCard);
