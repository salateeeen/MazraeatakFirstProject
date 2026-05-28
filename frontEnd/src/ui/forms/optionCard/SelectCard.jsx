import baseStyles from "./GlobalStyles.module.css";

export default function SelectCard({
  selected = false,
  onClick,
  title,
  description,
  icon,
  disabled = false,
  className = "",
}) {
  const activeClass = selected ? baseStyles.active : "";
  const disabledClass = disabled ? baseStyles.disabled : "";

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <div
      className={`${baseStyles.card} ${activeClass} ${disabledClass} ${className}`}
      onClick={handleClick}
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
    </div>
  );
}
