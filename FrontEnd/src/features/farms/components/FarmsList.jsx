import styles from "./FarmsList.module.css";
import { memo } from "react";

import { useFavoritesIds } from "../hooks/useFavoritesIds";
import HorizontalFarmCard from "./HorizontalFarmCard";
import HorizontalFarmCardSkeleton from "./HorizontalFarmCardSkeleton";
import Error from "@/ui/error/Error";
import { useDeleteFarm } from "../hooks/useDeleteFarm";
import Empty from "@/ui/empty/Empty";

function FarmsList({ isPending, farms = [], results, error, title, message}) {
  const { data: favoritesIds } = useFavoritesIds();
  const { mutate: deleteFarm, isPending: isDeleting } = useDeleteFarm();
  const favorites = favoritesIds?.data || [];
  const hasFarms = results > 0;

  return (
      <div className={styles.container}>
        <div className={styles.cards}>
          {isPending &&
            Array.from({ length: 4 }, (_, i) => <HorizontalFarmCardSkeleton key={i} />)}

          {!isPending && !hasFarms && !error && (
            <Empty title={title} message={message} />
          )}

          {!isPending &&
            hasFarms &&
            !error &&
            farms.map((farm) => (
              <HorizontalFarmCard
                key={farm._id}
                farm={farm}
                favorites={favorites}
                onDelete={deleteFarm}
                isDeleting={isDeleting}
              />
            ))}

          {error && <Error message={error.message} />}
        </div>
      </div>
  );
}

export default memo(FarmsList);
