import { useAddToFavorite } from "@/features/farms/hooks/useAddToFavorite";
import IconButton from "./IconButton";
import { LuHeart } from "react-icons/lu";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({ id, isFavorite, absolute = true, left = false, ...props }) {
  const { mutate: toggleFavorite, isPending: isToggling } = useAddToFavorite();

  function handleFav(e) {
    e.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <IconButton
      icon={LuHeart}
      iconClassName={`${isFavorite ? styles.fav : styles.notFav}`}
      onClick={handleFav}
      isPending={isToggling}
      absolute={absolute}
      left={left}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      {...props}
    />
  );
}
