import { useQuery } from "@tanstack/react-query";
import { fetchPendingOwners } from "../services/ownersApi";

export function usePendingOwners() {

    return useQuery({
        queryKey: ["admin", "pendingOwners"],
        queryFn: fetchPendingOwners,
    });
}