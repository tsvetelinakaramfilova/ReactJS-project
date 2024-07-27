import requester from "./requester";

const BASE_URL = "http://localhost:3030/data/articles/";

const getAll = async () => {
  const result = await requester.get(BASE_URL);
  const articles = Object.values(result);

  return articles;
};

const getOne = async (articleId) => {
  const result = await requester.get(`${BASE_URL}/${articleId}`);

  return result;
};

const create = (articleData) => requester.post(`${BASE_URL}`, articleData)

export default {
  getAll,
  getOne,
  create
};
