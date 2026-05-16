import { useQuery } from "@tanstack/react-query";
import { getMySettings } from "../services/settingsApi";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getMySettings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
