import Title from "@/ui/title/Title";
import { useFavoritesFarms } from "../hooks/useFavoriteFarms";
import Farms from "./Farms";
import { useSearchParams } from "react-router-dom";

export default function Favorites() {
  const [searchParams] = useSearchParams();
  const { data: favoriteFarmsData, isPending: fetchingFavorites, error } = useFavoritesFarms(searchParams.toString())

  return (
    <Farms
      farms={favoriteFarmsData?.data}
      isPending={fetchingFavorites}
      results={favoriteFarmsData?.results}
      error={error}
      title="No favorites yet"
      message="Mark your favorite farms to find them easily!"
      header={<Title>Favorites</Title>}
    />
  );
}
