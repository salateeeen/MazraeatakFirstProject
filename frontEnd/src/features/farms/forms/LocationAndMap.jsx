import React, { useEffect } from "react";
import stepStyles from "./LocationAndMap.module.css";
import Map from "@/features/map/components/Map";
import SelectCity from "@/ui/cities/forms/SelectCity";
import { useFormContext } from "react-hook-form";
import { useCities } from "@/ui/cities/hooks/useCities";

export default function LocationAndMap() {
  const { watch } = useFormContext();
 const { data: cities } = useCities();

  const cityId = watch("city");

  const cityCoords = cities?.data?.find(
    (city) => city._id === cityId
  )?.location?.coordinates;

  return (
    <div className={stepStyles.container}>
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Location</h4>
        <SelectCity />
      </div>

      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Choose Farm Location</h4>
        <div className={stepStyles.mapWrapper}>
          <Map
            className={stepStyles.map}
            isEditable={true}
            center={cityCoords}
          />
        </div>
      </div>
    </div>
  );
}
