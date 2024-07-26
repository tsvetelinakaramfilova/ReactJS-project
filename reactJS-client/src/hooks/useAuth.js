import { useContext } from "react";
import authApi from "../api/authApi";
import { AuthContext } from "../contexts/authContext";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (email, password) => {
    const { password: _, ...authData } = await authApi.login(email, password);

    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const registerHandler = async (email, password) => {
    const { password: _, ...authData } = await authApi.register(
      email,
      password
    );

    changeAuthState(authData);

    return authData;
  };

  return registerHandler;
};
