import FarmsFilter from "@/features/filter/components/FarmsFilter";
import styles from "./Farms.module.css";
import FarmsList from "../components/FarmsList";
import SortHeader from "@/ui/sort/SortHeader";

export default function Farms({ farms, results, isPending, error, title, message, header }) {
  return (
    <div className={styles.container}>
      <FarmsFilter />
      <div className={styles.farms}>
        <SortHeader />
        <FarmsList
          farms={farms}
          results={results}
          isPending={isPending}
          error={error}
          title={title}
          message={message}
          header={header}
        />
      </div>
    </div>
  );
}
