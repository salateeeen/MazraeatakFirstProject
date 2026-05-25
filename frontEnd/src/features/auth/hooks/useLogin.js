import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setUser } from "../../user/userSlice";

export function useLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            if (!data) return;

            localStorage.setItem("token", data.token);
            dispatch(setUser(data.user));
            toast.success("login successfully");

            const role = data?.user?.role;
            let redirectPath = "/";


            if (role === "user") redirectPath = "/app/home";
            if (role === "admin") redirectPath = "/admin/dashboard";
            if (role === "owner") redirectPath = "/owner/dashboard";

            setTimeout(() => {
                if(role){
                    navigate(redirectPath)
                }
            }, 1200);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
}