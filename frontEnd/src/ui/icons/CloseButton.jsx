import { LuX } from "react-icons/lu";
import IconButton from "./IconButton";

export default function CloseButton({ onClick, danger = false, ...props }) {

  return (
    <IconButton
      icon={LuX}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title="Close"
      absolute
      danger={danger}
      {...props}
    />
  );
}
