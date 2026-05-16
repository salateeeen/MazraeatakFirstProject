import { useFormContext } from "react-hook-form";
import { capitalizeFirstLetter, toCamelCase } from "@utils/handleStrings";
import styles from "../Form.module.css";
import selectStyles from "./Select.module.css";

export default function Select({
  className = "",
  name,
  label = name,
  options,
  display = "column",
  onChange,
  noRegister = false,
}) {

  const form = useFormContext();

  const displaySpan = display === "row" ? styles.row : styles.column;
  const register = form ? form.register : () => {};
  const registerResult = noRegister || !form ? {} : register(name);

  return (
    <div className={`${styles.container} ${displaySpan}`}>
      {label && <span className={styles.label}>{`${capitalizeFirstLetter(label)}`}</span>}
      <select
      defaultValue={""}
        className={`${styles.select} ${className}`}
        name={name}
        {...registerResult}
        onChange={(e) => {
          registerResult.onChange?.(e);
          onChange?.(e);
        }}
      >
        <option value="" disabled>
          {name}
        </option>
        {options?.map(({ value, label }, i) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
