import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../services/userApi";

import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../userSlice";
import { useEffect } from "react";

export function useMe() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { data, isPending, error, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
    enabled: !!token
  });

  useEffect(() => {
    if (isPending) {
      dispatch(setLoading(true));
    } else if (error) {
      dispatch(setError(error.message));
    } else if (data) {
      dispatch(setUser(data.data));
    } else {
      dispatch(setLoading(false));
    }
  }, [data, isPending, error, dispatch]);

  return { user: data, isPending, error, ...rest };
}
