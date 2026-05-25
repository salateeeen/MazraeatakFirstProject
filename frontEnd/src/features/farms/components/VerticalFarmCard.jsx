import styles from "./VerticalFarmCard.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { memo } from "react";

import DeleteButton from "@/ui/icons/DeleteButton";
import FavoriteButton from "@/ui/icons/FavoriteButton";
import { useCities } from "@/ui/cities/hooks/useCities";


import { HiOutlineMapPin } from "react-icons/hi2";
import { TbRulerMeasure } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";

function VerticalFarmCard({ farm, favorites = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyFarms = location.pathname.includes("my-farms");

  const {
    farmName,
    city,
    category,
    facilities,
    maximumGuests,
    numberOfRooms,
    area,
    oldPrice,
    _id: id,
    ratingsAverage: rating,
    ratingsQuantity: reviews,
    coverImage,
    basePrice
  } = farm;

  function handleNavigate() {
    navigate(`/app/farm/${id}`);
  }

  const token = localStorage.getItem("token");
  const showDelete = Boolean(token && isMyFarms);
  const showFavorite = Boolean(token && !isMyFarms);
  const isFavorite = favorites.includes(id);

  return (
    <div onClick={handleNavigate} className={styles.card}>
      {showDelete && <DeleteButton id={id} absolute left />}
      {showFavorite && (
        <FavoriteButton
          id={id}
          isFavorite={isFavorite}
          absolute
        />
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
            {facilities?.slice(0, 2).map((facility) => (
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

export default memo(VerticalFarmCard);
