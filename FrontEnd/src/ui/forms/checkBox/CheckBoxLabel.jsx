import styles from "./CheckBoxLabel.module.css";
import { capitalizeFirstLetter } from "@utils/handleStrings";

export default function CheckBoxLabel({ id, label, logo, field }) {
  return (
    <label className={`${styles.label}`}>
      <input
        type="checkbox"
        hidden
        value={id}
        checked={field?.value?.includes(id) || false}
        onChange={(e) => {
          const checked = e.target.checked;
          const current = field.value || [];

          if (checked) {
            field.onChange([...current, id]);
          } else {
            field.onChange(current.filter((v) => v !== id));
          }
        }}
      />
      <div className={styles.span}>
        <span>{logo}</span>
        <span>{capitalizeFirstLetter(label)}</span>
      </div>
    </label>
  );
}
