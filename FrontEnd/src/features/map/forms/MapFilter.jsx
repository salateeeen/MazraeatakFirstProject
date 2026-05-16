import styles from "./MapFilter.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { LuMapPin, LuMapPinHouse, LuX } from "react-icons/lu";
import Input from "@/ui/forms/input/Input";
import { useNavigate } from "react-router-dom";
import {
  getCurrentPosition,
  getStoredCoordinates,
} from "@/utils/handleLocation";
import SelectCity from "@/ui/cities/components/SelectCity";

export default function MapFilter({ className }) {
  const [lat, lng] = getStoredCoordinates();
  const navigate = useNavigate();

  const mapFilter = useForm({
    defaultValues: {
      city: "",
      location: "",
      distance: "",
    },
  });

  function onSubmitMap(data) {
    const params = new URLSearchParams();

    if (data.city) {
      params.set("city", data.city);
    }

    if (data.location) {
      params.set("location", data.location);
    }

    if (data.distance?.trim()) {
      params.set("distance", data.distance);
      params.set("latlng", `${lat},${lng}`);  
    }

    navigate(`/app/home?${params.toString()}`, { replace: false });
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mapFilter.handleSubmit(onSubmitMap)();
      const form = e.target.form;
      const index = Array.from(form).indexOf(e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement) nextElement.focus();
    }
  };

  return (
    <FormProvider {...mapFilter}>
      <form
        className={className}
        onSubmit={mapFilter.handleSubmit(onSubmitMap)}
      >
        <SelectCity onChange={mapFilter.handleSubmit(onSubmitMap)} />

        <Input
          name="location"
          label="location"
          placeholder="location"
          display="column"
          onBlur={mapFilter.handleSubmit(onSubmitMap)}
          onKeyDown={onKeyDown}
        />

        <Input
          type="number"
          name="distance"
          label="Distance"
          placeholder="Distance"
          display="column"
          onBlur={mapFilter.handleSubmit(onSubmitMap)}
          onKeyDown={onKeyDown}
        >
          <LuMapPinHouse alt="choose in map" onClick={getCurrentPosition} />
        </Input>
      </form>
    </FormProvider>
  );
}
