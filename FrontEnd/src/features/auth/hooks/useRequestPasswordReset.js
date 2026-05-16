import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/authApi";
import toast from "react-hot-toast";

export const useRequestPasswordReset = function () {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: requestPasswordReset,
        onSuccess: (data, variables) => {
            toast.success("If this account exists, you will receive a verification code.");
            setTimeout(() => {
                navigate("/verify-code", { state: { email: variables } });
            }, 1200);
        },
        onError: (err) => {
            toast.error(err.message);

        },
    })

} 