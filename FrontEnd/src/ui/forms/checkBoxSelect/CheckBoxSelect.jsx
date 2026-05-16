import { useRef } from "react";
import styles from "./CheckBoxSelect.module.css";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { LuArrowDown } from "react-icons/lu";
import Input from "../input/Input";
import DropDown from "@/ui/dropDown/DropDown";

export default function CheckBoxSelect({
  name,
  label,
  value,
  onClick,
  children,
  display,
}) {
  const containerRef = useRef();
  const [open, setOpen] = useCloseComponents(containerRef);

  function handleToggle() {
    setOpen((prev) => !prev);
    if (onClick) onClick();
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <Input
        name={name}
        noRegister={true}
        readOnly={true}
        required={true}
        value={value}
        onClick={handleToggle}
        display={display}
      >
        <LuArrowDown onClick={handleToggle} />
      </Input>

      {open && <DropDown className={`${styles.list}`}>{children}</DropDown>}
    </div>
  );
}
