import { useFormContext } from "react-hook-form";
import styles from "./TextArea.module.css";

export default function TextArea({
  className = "",
  name = "",
  placeholder,
  required = false,
}) {
  const { register } = useFormContext();

  return (
    <textarea
      placeholder={placeholder}
      className={`${styles.text} ${className}`}
      {...register(name)}
      required={required}
    ></textarea>
  );
}
