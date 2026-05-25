import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyResetCode } from "../services/authApi";
import toast from "react-hot-toast";

export const useVerifyResetCode = function () {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, code }) => verifyResetCode({ email, code }),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success("Code verified! Redirecting to reset password...");
            setTimeout(() => {
                navigate("/app/home");
            }, 1200);
        },
        onError: (err) => {
            toast.error(err.message || "Invalid code. Please try again.");
        },
    })
}