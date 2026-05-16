import FarmsCarousel from "@/features/farms/components/FarmsCarousel";
import Filter from "@/features/filter/components/Filter";
import { useAllFarms } from "@/features/farms/hooks/useAllFarms";
import Title from "@/ui/title/Title";
import Cities from "@/ui/cities/components/CitiesList";
import CategoryCards from "@/ui/categories/components/CategoriesList";
import JoinUsBanner from "@/ui/joinUsBanner/JoinUsBanner";
import { useSearchParams } from "react-router-dom";
import { useLocations } from "@/features/farms/hooks/useLocations";

export default function Home() {
  const [searchParams] = useSearchParams();
  const { data: farms, isPending, error } = useAllFarms();

  const {
    data: locations,
    isPending: fetchingLocations,
    error: fetchingLocationsError,
  } = useLocations(searchParams.toString());

  const coordinates = locations?.data.map((data) => data.location.coordinates) || [];
  
  return (
    <>
      <Filter markers={coordinates} />
      <JoinUsBanner />
      <CategoryCards />
      <Cities />
      <FarmsCarousel
        farms={farms}
        isPending={isPending}
        error={error}
        header={
          <Title subtitle="Discover the best farms for rent">Farms</Title>
        }
      />
    </>
  );
}
