import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }) => resetPassword({ email, password }),
        onSuccess: () => {
            setTimeout(() => {
                toast.success("Password reset successfully! Redirecting to login...");
                navigate("/login");
            }, 1200);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    })

}