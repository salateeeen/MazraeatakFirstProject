import { FormProvider, useForm } from "react-hook-form";
import styles from "./Filter.module.css";
import mapStyles from "@/features/map/forms/MapFilter.module.css";
import { LuEarth } from "react-icons/lu";

import Map from "@features/map/components/Map";
import MapFilter from "@/features/map/forms/MapFilter";
import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import CheckBoxFacilities from "@/ui/facilities/components/CheckBoxFacilities";
import Container from "@/ui/container/Container";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "@/ui/forms/select/Select";
import { useLocations } from "@/features/farms/hooks/useLocations";

const rating = [
  { value: 1, label: "1 Star" },
  { value: 2, label: "2 Stars" },
  { value: 3, label: "3 Stars" },
  { value: 4, label: "4 Stars" },
  { value: 5, label: "5 Stars" },
];

export default function Filter() {
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  
  const filterForm = useForm({
    MaxPrice: "",
    availbleIn: "",
    facilities: [],
    rating: "",
  });

  function onSubmitFilter(data) {
    const params = new URLSearchParams();

    if (data.maxPrice?.trim()) {
      params.set("dailyPrice[lte]", data.maxPrice);
    }

    if (data.availableIn) {
      params.set("availableIn[gte]", data.availableIn);
    }

    if (data.rating?.trim()) {
      params.set("ratingsAverage[gte]", data.rating);
    }

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((f) => {
        params.append("facilities[all]", f);
      });
    }

    navigate(`/app/farms?${params.toString()}`, { replace: false });
  }

  const { data: locations } = useLocations(searchParams.toString());
  const coords = locations?.data.map((data) => data.location.coordinates) || [];
  return (
    <Container className={styles.container}>
      <div className={mapStyles.mapContainer}>
        <Map className={mapStyles.map} markers={coords} zoom={15} />

        <div className={mapStyles.mapFormContainer}>
          <div className={mapStyles.mapHeader}>
            <LuEarth className={mapStyles.earth} />
            <h3>Map Search</h3>
          </div>
          <MapFilter className={mapStyles.mapFilter} />
        </div>
      </div>

      <FormProvider {...filterForm}>
        <form
          className={styles.filters}
          onSubmit={filterForm.handleSubmit(onSubmitFilter)}
        >
          <div className={styles.inputs}>
            <CheckBoxFacilities />
            <Input
              type="date"
              name="availbleIn"
              label="Available In"
              placeholder="Pick a date"
            />
            <Input name="maxPrice" label="Max Price (JOD)" placeholder="e.g. 200" />
            <Select name="rating" label="Minimum Rating" options={rating} />
          </div>

          <Button type="submit" className={styles.searchBtn}>
            SEARCH FARMS
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}
