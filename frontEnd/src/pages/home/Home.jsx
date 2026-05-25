import FarmsCarousel from "@/features/farms/components/FarmsCarousel";
import Filter from "@/features/filter/components/Filter";
import { useAllFarms } from "@/features/farms/hooks/useAllFarms";
import Title from "@/ui/title/Title";
import Cities from "@/ui/cities/components/CitiesList";
import CategoryCards from "@/ui/categories/components/CategoriesList";
import JoinUsBanner from "@/ui/joinUsBanner/JoinUsBanner";

export default function Home() {
  const { data: farms, isPending, error } = useAllFarms();

  return (
    <>
      <Filter />
      <JoinUsBanner />
      <CategoryCards />
      <Cities />
      <FarmsCarousel
        farms={farms}
        isPending={isPending}
        error={error}
        header={
          <header><Title subtitle="Discover the best farms for rent">Farms</Title></header>
        }
      />
    </>
  );
}
