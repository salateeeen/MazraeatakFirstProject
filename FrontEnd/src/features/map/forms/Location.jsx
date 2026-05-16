import { useRef, useState } from "react";
import styles from "./Location.module.css";
import Map from "@features/map/components/Map";
import Input from "@/ui/forms/input/Input";
import { LuMapPin } from "react-icons/lu";
import { useFormContext } from "react-hook-form";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { getCityInfo } from "../services/mapApi";

export default function Location() {
  const [open, setOpen] = useState(false);
  const { setValue } = useFormContext();
  const containerRef = useRef();

  function handleOpen() {
    setOpen((open) => !open);
  }

  useCloseComponents(setOpen, containerRef);

  async function handleSelect(lat, lng) {
    const { suburb } = await getCityInfo(lat, lng);
    setValue("coordinates", {
      lat,
      lng,
    });
    setValue("location", suburb);
    setOpen(false);
  }

  return (
    <div className={styles.locationContainer} ref={containerRef}>
      <Input
        name={"location"}
        readOnly={true}
        required={true}
        onClick={handleOpen}
      >
        <LuMapPin />
      </Input>

      {open && (
        <div className={styles.mapContainer}>
          <Map className={styles.map} onSelect={handleSelect} isEditable={true} />
        </div>
      )}
    </div>
  );
}
