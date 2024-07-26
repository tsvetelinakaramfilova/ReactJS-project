import authApi from "../api/authApi";

export const useLogin = () => {
  const loginHandler = async (email, password) => {
    await authApi.login(email, password);
  };

  return loginHandler;
};
