import FarmsCarousel from "@/features/farms/components/FarmsCarousel";
import Filter from "@/features/filter/components/Filter";
import { useAllFarms } from "@/features/farms/hooks/useAllFarms";
import Title from "@/ui/title/Title";
import Cities from "@/ui/cities/components/CitiesList";
import CategoryCards from "@/ui/categories/components/CategoriesList";
import JoinUsBanner from "@/ui/joinUsBanner/JoinUsBanner";
import { useFavoritesFarms } from "@/features/farms/hooks/useFavoriteFarms";

export default function Home() {
  const { data: farms, isPending, error } = useAllFarms();
  const {
    data: favoriteFarms,
    isPending: favoriteFarmsIsPending,
    error: favoriteFarmsError,
  } = useFavoritesFarms();

  return (
    <>
      <Filter />
      <JoinUsBanner />
      <FarmsCarousel
        farms={favoriteFarms}
        isPending={favoriteFarmsIsPending}
        error={favoriteFarmsError}
        header={
          <header>
            <Title subtitle="Discover the best farms you liked">My Favorite Farms</Title>
          </header>
        }
      />
      <CategoryCards />
      <Cities />
      <FarmsCarousel
        farms={farms}
        isPending={isPending}
        error={error}
        header={
          <header>
            <Title subtitle="Discover the best farms for rent">Farms</Title>
          </header>
        }
      />
    </>
  );
}
