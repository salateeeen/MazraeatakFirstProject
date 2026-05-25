import Title from "@/ui/title/Title";
import { useMyFarms } from "../hooks/useMyFarms";
import Farms from "./Farms";
import FarmsList from "../components/FarmsList";

export default function MyFarms() {
  const { data: myFarmsData, isPending: fetchingMyFarms, error } = useMyFarms();

  return (
    <div>
      <FarmsList
        farms={myFarmsData?.data}
        isPending={fetchingMyFarms}
        results={myFarmsData?.results}
        error={error}
        title="No farms added"
        message="Add your first farm and start hosting!"
      />
    </div>
  );
}
