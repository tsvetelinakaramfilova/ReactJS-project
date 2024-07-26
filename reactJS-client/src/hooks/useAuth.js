import { useContext } from "react";
import authApi from "../api/authApi";
import { AuthContext } from "../contexts/authContext";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (email, password) => {
    const result = await authApi.login(email, password);

    changeAuthState(result);
  };

  return loginHandler;
};
