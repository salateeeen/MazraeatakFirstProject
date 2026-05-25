import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authApi";
import toast from "react-hot-toast";

export function useSignup() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            if (!data) return;
            localStorage.setItem("token", data.token);
            toast.success("Account created successfully");
            setTimeout(() => {
                navigate("/app/home");
            }, 1200);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
}