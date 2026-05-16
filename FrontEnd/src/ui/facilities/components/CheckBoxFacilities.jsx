import styles from "./CheckBoxFacilities.module.css";
import CheckBoxGroup from "@/ui/forms/checkBox/CheckBoxGroup";
import { useFormContext } from "react-hook-form";
import { useFacilities } from "@/ui/facilities/hooks/useFacilities";
import CheckBoxSelect from "@/ui/forms/checkBoxSelect/CheckBoxSelect";

export default function CheckBoxFacilities() {
  const { control, watch } = useFormContext();
  const { data: facilitiesData, isPending, error } = useFacilities();

  const facilitiesID = watch("facilities");

  const facilitiesName =
    facilitiesData?.data
      ?.filter((fac) => facilitiesID?.includes(fac._id))
      ?.map((fac) => fac.name)
      ?.join(" - ") || "";

  return (
    <>
      {!isPending && !error &&
        <CheckBoxSelect
          name="facilities"
          label="Facilities"
          value={facilitiesName}
          display="column"
        >
          <CheckBoxGroup
            name="facilities"
            control={control}
            data={facilitiesData?.data || []}
            isPending={isPending}
            error={error}
            className={styles.facilities}
          />
        </CheckBoxSelect>
      }
    </>
  );
}
