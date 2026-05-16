import React from "react";
import stepStyles from "./LocationAndMap.module.css";
import Map from "@/features/map/components/Map";
import SelectCity from "@/ui/cities/components/SelectCity";

export default function LocationAndMap() {
  return (
    <div className={stepStyles.container}>
      
      {/* 🔥 location section */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Location</h4>
        <SelectCity />
      </div>

      {/* 🔥 map section */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Choose Farm Location</h4>
        <div className={stepStyles.mapWrapper}>
          <Map className={stepStyles.map}/>
        </div>
      </div>

    </div>
  );
}
