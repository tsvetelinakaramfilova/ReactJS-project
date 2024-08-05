import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

export default function LogOut() {
  const navigate = useNavigate();
  const { logout: localLogout } = useAuthContext();
  useEffect(() => {
    try {
      localLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }, [localLogout, navigate]);

  return null;
}