import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Routers from "./Routers";
import { Toaster } from "react-hot-toast";
import { ConfirmProvider } from "../context/ConfirmContext";
import { useMe } from "@/features/user/hooks/useMe";

function UserInitializer() {
  useMe();
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInitializer />
      <Toaster position="top-center" />
      <ReactQueryDevtools /> 
      <ConfirmProvider>
        <Routers />
      </ConfirmProvider>
    </QueryClientProvider>
  );
}
