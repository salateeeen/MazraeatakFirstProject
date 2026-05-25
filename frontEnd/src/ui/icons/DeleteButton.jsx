import { LuTrash2 } from "react-icons/lu";
import IconButton from "./IconButton";
import { useConfirm } from "@/context/ConfirmContext";
import { capitalizeFirstLetter } from "@/utils/handleStrings";

export default function DeleteButton({
  onClick,
  onDelete,
  id,
  resourceName = "item",
  absolute = false,
  left = false,
  confirming = true,
  ...props
}) {
  const confirm = useConfirm();
  
  const handleWithoutConfirm = (e) => {
    e.stopPropagation()
    if(onDelete){
      onDelete(id)
    }
  }

  const handleWithConfirm = async (e) => {
    e.stopPropagation();

    if (onClick) {
      onClick(id);
      return;
    }

    const isConfirmed = await confirm({
      title: `Delete ${capitalizeFirstLetter(resourceName)}`,
      message: `Are you sure you want to delete this ${resourceName}? This action cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
    });

    if (isConfirmed && onDelete) {
      onDelete(id);
    }
  };

  return (
    <IconButton
      icon={LuTrash2}
      variant="danger"
      onClick={confirming ? handleWithConfirm : handleWithoutConfirm}
      title={`Delete ${resourceName}`}
      absolute={absolute}
      left={left}
      {...props}
    />
  );
}
