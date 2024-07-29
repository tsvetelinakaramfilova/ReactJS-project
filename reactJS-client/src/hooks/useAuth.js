import authApi from "../api/authApi";
import { useAuthContext } from "../contexts/authContext";

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();

  const loginHandler = async (email, password) => {
    const { password: _, ...authData } = await authApi.login(email, password);

    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();

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
