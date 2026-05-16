import styles from "./Farm.module.css";
import Images from "@/ui/images/Images.jsx";
import Map from "@features/map/components/Map.jsx";
import Reviews from "@/features/reviews/components/Reviews";
import FarmInfo from "../components/FarmInfo";
import FarmOwnerCard from "../components/FarmOwnerCard";
import FarmHighlights from "../components/FarmHighlights";
import BookingCTA from "../components/BookingCTA.jsx";
import ImagesSkeleton from "../components/ImagesSkeleton";
import FarmInfoSkeleton from "../components/FarmInfoSkeleton";
import MapSkeleton from "../../map/components/MapSkeleton";
import FarmOwnerCardSkeleton from "../components/FarmOwnerCardSkeleton";
import FarmHighlightsSkeleton from "../components/FarmHighlightsSkeleton";
import FarmPricingSkeleton from "../components/FarmPricingSkeleton";
import BookingCTASkeleton from "../components/BookingCTASkeleton";
import { useParams } from "react-router-dom";
import { useFarm } from "../hooks/useFarm";
import FarmPricing from "../components/FarmPricing";
import Description from "@/ui/description/Description";
import Error from "@/ui/error/Error";

export default function Farm() {
  const { id } = useParams();
  const { data: farmData, isPending: fetchingFarm, error } = useFarm(id);
  const farm = farmData?.data?.farm;

  if (error) return <Error message={error.message} />;
  return (
    <div className={styles.page}>
      {fetchingFarm && (
        <>
          <div className={styles.topGrid}>
            <div className={styles.infoMap}>
              <FarmInfoSkeleton />
              <MapSkeleton />
            </div>
            <div className={styles.galleryCard}>
              <ImagesSkeleton />
            </div>
          </div>
          <div className={styles.sideGrid}>
            <FarmOwnerCardSkeleton />
            <FarmHighlightsSkeleton />
          </div>
          <div className={styles.bookingGrid}>
            <FarmPricingSkeleton />
            <BookingCTASkeleton />
          </div>
        </>
      )}

      {!fetchingFarm && !error && farm && (
        <>
          <div className={styles.topGrid}>
            <div className={styles.infoMap}>
              <FarmInfo farm={farm} className={styles.info} />
              <Map
                className={styles.map}
                markers={farm.location.coordinates}
              />
            </div>
            <div className={styles.galleryCard}>
              <Images images={farm.images} />
            </div>
          </div>

          <section>
            <Description description={farm.description} />
          </section>

          <div className={styles.sideGrid}>
            <FarmOwnerCard owner={farm.farmOwner} />
            <FarmHighlights farm={farm} />
          </div>

          <div className={styles.bookingGrid}>
            <FarmPricing timeSlots={farm.timeSlots} pricing={farm.pricing} />
            <BookingCTA
              farmOwnerId={farm.farmOwner._id}
              nextWeekAvailability={farmData?.data?.nextWeekAvailability}
            />
          </div>

          <div>
            <Reviews
              farmId={farm._id}
              averageRating={farm.ratingsAverage}
              totalReviews={farm.ratingsQuantity}
            />
          </div>
        </>
      )}
    </div>
  );
}
