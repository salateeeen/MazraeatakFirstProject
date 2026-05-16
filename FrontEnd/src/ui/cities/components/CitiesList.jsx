import styles from "./CitiesList.module.css";
import { memo, useRef } from "react";

import { ScrollArrow } from "@/ui/scrollArrow/ScrollArrow";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import Title from "@/ui/title/Title";
import CityCardSkeleton from "./CityCardSkeleton";
import CityCard from "./CityCard";

function CitiesList() {
  const ref = useRef();
  const navigate = useNavigate();
  const { check, canLeft, canRight, scroll } = useHorizontalScroll(ref, 200);
  const { data: cities, isPending, error } = useCities();

  function handleClick(city) {
    const params = new URLSearchParams();

    if (city?._id) {
      params.set("city", city?._id);
    }
    navigate(`/app/farms?${params.toString()}`, { replace: false });
  }

  return (
    <div className={styles.container}>
      <Title subtitle="Browse through the cities and find the perfect farm for you">Cities</Title>
      <div className={styles.wrapper}>
        <ScrollArrow
          className={styles.left}
          show={canLeft}
          direction="left"
          onClick={() => scroll("left")}
          size={30}
        />

        <div className={styles.cards} ref={ref} onScroll={check}>
          {isPending &&
            !error &&
            Array.from({ length: 8 }).map((_, i) => (
              <CityCardSkeleton key={i} />
            ))}

          {!isPending &&
            !error &&
            cities.data.map((city) => (
              <CityCard
                key={city._id}
                city={city}
                onClick={() => handleClick(city)}
              />
            ))}
        </div>

        <ScrollArrow
          className={styles.right}
          show={canRight}
          direction="right"
          onClick={() => scroll("right")}
          size={30}
        />
      </div>
    </div>
  );
}

export default memo(CitiesList);
