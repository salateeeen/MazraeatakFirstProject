import { LuStar } from "react-icons/lu";
import styles from "./Stars.module.css";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Stars({ 
  rating: initialRating = 0, 
  readonly = true, 
  name = "rating", 
  size = "1rem", 
  className = "", 
  length = 5 
}) {
  const [hover, setHover] = useState(0);
  
  const context = useFormContext();
  const value = context?.watch(name) ?? initialRating;

  const handleClick = (i) => {
    if (readonly) return;
    context?.setValue(name, i + 1, { shouldValidate: true, shouldDirty: true });
  };

  const handleMouseEnter = (i) => {
    if (readonly) return;
    setHover(i + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHover(0);
  };

  return (
    <div 
      className={`${styles.container} ${!readonly ? styles.editable : ""} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length }, (_, i) => {
        const ratingValue = i + 1;
        const isFilled = (hover || value) >= ratingValue;
        
        return (
          <LuStar
            key={i}
            size={size}
            className={`${styles.star} ${isFilled ? styles.filled : ""} ${!readonly ? styles.interactive : ""}`}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(i)}
          />
        );
      })}
    </div>
  );
}
