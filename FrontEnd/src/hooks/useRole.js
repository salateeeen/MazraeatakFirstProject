import { useSelector } from "react-redux";
import { selectUserRole } from "@/features/user/userSlice";

export function useRole() {
    const role = useSelector(selectUserRole);
    const isAdmin = role === "admin";
    const isOwner = role === "owner";
    const isUser = role === "user";
    return { role, isAdmin, isOwner, isUser }
}