import requester from "./requester";

const BASE_URL = "http://localhost:3030/users";

const login = async (email, password) => {
  const authData = await requester.post(`${BASE_URL}/login`, {
    email,
    password,
  });

  return authData;
};

const register = async (email, password) => {
  const registerData = await requester.post(`${BASE_URL}/register`, {
    email,
    password,
  });

  return registerData;
};

const logout = () => requester.get(`${BASE_URL}/logout`);

export default {
  login,
  register,
  logout,
};
