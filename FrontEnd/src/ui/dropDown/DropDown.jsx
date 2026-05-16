import styles from "./DropDown.module.css";

export default function DropDown({ children, className = "", style = {} }) {
  return (
    <div 
      className={`${styles.dropdown} ${className}`} 
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
