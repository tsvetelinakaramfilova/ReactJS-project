import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

export default function PublicGuard() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to={"/"} /> : <Outlet />;
}
