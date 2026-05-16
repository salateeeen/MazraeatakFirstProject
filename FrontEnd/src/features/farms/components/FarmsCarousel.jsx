import styles from "./FarmsCarousel.module.css";
import { memo, useRef} from "react";
import NoCardsYet from "@/ui/noCardsYet/NoCardsYet";
import VerticalFarmCardSkeleton from "./VerticalFarmCardSkeleton";
import { useFavoritesIds } from "../hooks/useFavoritesIds";

import { ScrollArrow } from "@/ui/scrollArrow/ScrollArrow";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import VerticalFarmCard from "./VerticalFarmCard";
import Empty from "@/ui/empty/Empty";

function FarmsCarousel({ isPending, farms = {}, error, title, message, header }) {
  const { data: favoritesIds } = useFavoritesIds();
  const ref = useRef();
  const favorites = favoritesIds?.data || [];
  const hasFarms = farms?.results > 0;
  const { canLeft, canRight, scroll, check } = useHorizontalScroll(ref, 270);

  if(!isPending && !hasFarms && !error){
    return null
  }

  return (
    <div className={`${styles.container}`}>
      {header}
      <div className={styles.wrapper}>
        <ScrollArrow
          className={styles.left}
          show={canLeft}
          direction={"left"}
          onClick={() => scroll("left")}
        />

        <div className={styles.cards}  ref={ref}>
          {isPending &&
            Array.from({ length: 7 }, (_, i) => <VerticalFarmCardSkeleton key={i} />)}

         

          {!isPending &&
            hasFarms &&
            !error &&
            farms.data.map((farm) => (
              <VerticalFarmCard key={farm._id} farm={farm} favorites={favorites} />
            ))}
          {error && <h1>{error.message}</h1>}
        </div>

        <ScrollArrow
          className={styles.right}
          show={canRight}
          direction={"right"}
          onClick={() => scroll("right")}
        />
      </div>
    </div>
  );
}

export default memo(FarmsCarousel);
