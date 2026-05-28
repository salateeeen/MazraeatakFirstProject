import styles from "./ToggleCard.module.css";
import baseStyles from "./GlobalStyles.module.css";

export default function ToggleCard({
  checked = false,
  onChange,
  title,
  description,
  icon,
  disabled = false,
  className = "",
}) {
  const activeClass = checked ? baseStyles.active : "";
  const disabledClass = disabled ? baseStyles.disabled : "";

  return (
    <label
      className={`${baseStyles.card} ${activeClass} ${disabledClass} ${className}`}
    >
      <div className={baseStyles.leftContainer}>
        {icon && <span className={baseStyles.iconWrapper}>{icon}</span>}
        <div className={baseStyles.textGroup}>
          {title && <h4 className={baseStyles.title}>{title}</h4>}
          {description && (
            <p className={baseStyles.description}>{description}</p>
          )}
        </div>
      </div>

      <div className={baseStyles.controlWrapper}>
        <input
          type="checkbox"
          className={styles.switch}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </label>
  );
}
