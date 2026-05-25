import styles from "./MapFilter.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { LuMapPinHouse } from "react-icons/lu";
import Input from "@/ui/forms/input/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectCity from "@/ui/cities/forms/SelectCity";
import {
  getCurrentPosition,
  setCurrentPosition,
} from "../utils/handleLocation";
import Select from "@/ui/forms/select/Select";

const units = [
  { value: "km", label: "Kilometer" },
  { value: "mi", label: "Mile" },
];

export default function MapFilter({ className }) {
  const navigate = useNavigate();
  const currentCoords = getCurrentPosition();

  const mapFilterForm = useForm({
    defaultValues: {
      city: "",
      location: "",
      distance: "",
      unit: "km",
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

    if (data.distance?.trim() && currentCoords) {
      params.set("distance", data.distance);
      params.set("unit", data.unit);
      params.set("lat", currentCoords.lat);
      params.set("lng", currentCoords.lng);
    }

    navigate(`/app/home?${params.toString()}`, { replace: false });
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mapFilterForm.handleSubmit(onSubmitMap)();
      const form = e.target.form;
      const index = Array.from(form).indexOf(e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement) nextElement.focus();
    }
  };

  return (
    <FormProvider {...mapFilterForm}>
      <form
        className={className}
        onSubmit={mapFilterForm.handleSubmit(onSubmitMap)}
      >
        <SelectCity onChange={mapFilterForm.handleSubmit(onSubmitMap)} />

        <Input
          name="location"
          label="location"
          placeholder="location"
          display="column"
          onBlur={mapFilterForm.handleSubmit(onSubmitMap)}
          onKeyDown={onKeyDown}
        />

        <Select
          name="unit"
          options={units}
          label={"unit"}
          onChange={mapFilterForm.handleSubmit(onSubmitMap)}
        />

        <Input
          type="number"
          name="distance"
          label="Distance"
          placeholder="Distance"
          display="column"
          onBlur={mapFilterForm.handleSubmit(onSubmitMap)}
          onKeyDown={onKeyDown}
        >
          <LuMapPinHouse
            alt="choose in map"
            onClick={() => setCurrentPosition()}
          />
        </Input>
      </form>
    </FormProvider>
  );
}
