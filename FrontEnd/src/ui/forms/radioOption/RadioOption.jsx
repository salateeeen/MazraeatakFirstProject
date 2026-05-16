import styles from "./RadioOption.module.css";

export default function RadioOption({ name, value, checked, onChange, title, description }) {
  return (
    <label className={styles.item}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </label>
  );
}
