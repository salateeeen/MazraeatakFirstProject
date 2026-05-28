import styles from "./RadioCard.module.css";
import baseStyles from "./GlobalStyles.module.css";

export default function RadioCard({
  checked = false,
  onChange,
  title,
  description,
  icon,
  name,
  value,
  disabled = false,
  className = "",
}) {
  const activeClass = checked ? baseStyles.active : "";
  const disabledClass = disabled ? baseStyles.disabled : "";

  return (
    <label
      className={`${baseStyles.card} ${activeClass} ${disabledClass} ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className={styles.radio}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      <div className={baseStyles.leftContainer}>
        {icon && <span className={baseStyles.iconWrapper}>{icon}</span>}
        <div className={baseStyles.textGroup}>
          {title && <h4 className={baseStyles.title}>{title}</h4>}
          {description && (
            <p className={baseStyles.description}>{description}</p>
          )}
        </div>
      </div>
    </label>
  );
}
