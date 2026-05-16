import CheckBoxLabel from "./CheckBoxLabel";
import { Controller } from "react-hook-form";
import Skeleton from "@/ui/skeleton/Skeleton";
import styles from "./CheckBoxGroup.module.css";

export default function CheckBoxGroup({
  control,
  name,
  data = [],
  isPending,
  error,
  labelKey = "name",
  valueKey = "_id",
  logoKey = "logo",
  className = "",
}) {
  return (
    <div className={styles.group}>
      {isPending && (
        <div className={className}>
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {error && <p className={styles.error}>{error.message}</p>}

      {!isPending && !error && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={`${styles.list} ${className}`}>
              {data.map((item) => (
                <CheckBoxLabel
                  key={item[valueKey]}
                  field={field}
                  id={item[valueKey]}
                  label={item[labelKey]}
                  logo={item[logoKey]}
                />
              ))}
            </div>
          )}
        />
      )}
    </div>
  );
}