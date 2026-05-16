import styles from "./IconButton.module.css";
import Spinner from "@/ui/spinner/Spinner";

export default function IconButton({ 
  icon: Icon, 
  onClick, 
  variant = "default", 
  size = "md", 
  className = "", 
  iconClassName = "",
  disabled = false, 
  isPending = false,
  title = "",
  type = "button",
  iconSize = 18,
  absolute = false,
  left = false,
  danger = false,
  resourceName,
  ...props
}) {

  const buttonClasses = [
    styles.icon,
    styles[variant],
    styles[size],
    danger ? styles.closeCancel : "",
    absolute ? styles.absolute : "",
    left ? styles.left : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isPending}
      title={title}
      {...props}
    >
      {isPending ? (
        <Spinner size="xs" />
      ) : (
        <Icon size={iconSize} className={iconClassName} />
      )}
    </button>
  );
}
