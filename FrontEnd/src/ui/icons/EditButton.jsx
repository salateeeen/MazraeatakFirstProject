import { MdEdit } from "react-icons/md";
import IconButton from "./IconButton";

export default function EditButton({ onClick, ...props }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <IconButton
      icon={MdEdit}
      onClick={handleClick}
      variant="default"
      title="Edit"
      {...props}
    />
  );
}
