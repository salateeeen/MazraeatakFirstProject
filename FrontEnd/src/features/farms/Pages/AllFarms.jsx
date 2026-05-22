import Title from "@/ui/title/Title";
import { useAllFarms } from "../hooks/useAllFarms";
import { useSearchParams } from "react-router-dom";
import Farms from "./Farms";

export default function AllFarms() {
  const [searchParams] = useSearchParams();

  const { data: farmsData, isPending: fetchingFarms, error } = useAllFarms(searchParams.toString());

  return (
    <Farms
      farms={farmsData?.data}
      results={farmsData?.results}
      isPending={fetchingFarms}
      error={error}
      title={"No farms available"}
      message={"Check back later for new farms!"}
      header={<header><Title subtitle="Browse through the farms and find the perfect farm for you">Farms</Title></header>}
    />
  );
}
