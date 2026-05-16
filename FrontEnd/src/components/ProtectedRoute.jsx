import { Navigate } from "react-router-dom";
import Spinner from "@/ui/spinner/Spinner";
import { useSelector } from "react-redux";
import { selectUser, selectUserLoading, selectUserError } from "@/features/user/userSlice";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector(selectUser);
  const fetchingUser = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const token = localStorage.getItem("token");

  if (fetchingUser && token) {
    return (
      <div style={{ 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "var(--surface-ground)"
      }}>
        <Spinner size="80px" />
      </div>
    );
  }

  if (!token || error || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/app/home" replace />;
  }

  return children;
}
