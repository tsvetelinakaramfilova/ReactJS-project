import requester from "./requester";

const BASE_URL = "http://localhost:3030/jsonstore/articles/";

const getAll = async () => {
  const result = await requester.get(BASE_URL);
  const articles = Object.values(result);

  return articles;
};

const getOne = async (articleId) => {
  const result = await requester.get(`${BASE_URL}/${articleId}`);

  return result;
};

export default {
  getAll,
  getOne,
};
