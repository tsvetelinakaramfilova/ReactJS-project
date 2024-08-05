import requester from "./requester";

const BASE_URL = "http://localhost:3030/data/articles";

const getAll = async () => {
  const result = await requester.get(BASE_URL);

  return result;
};

const getLastThird = async () => {
  const params = new URLSearchParams({
    // sortBy: "_createdOn desc",
    pageSize: "3",
  });

  const result = requester.get(
    `${BASE_URL}?sortBy=_createdOn%20desc&${params.toString()}`
  );

  return result;
};

const getOne = async (articleId) => {
  const result = await requester.get(`${BASE_URL}/${articleId}`);

  return result;
};

const create = (articleData) => requester.post(`${BASE_URL}`, articleData);

const edit = (articleId, articleData) =>
  requester.put(`${BASE_URL}/${articleId}`, articleData);

const remove = (articleId) => requester.remove(`${BASE_URL}/${articleId}`);

export default {
  getAll,
  getLastThird,
  getOne,
  create,
  edit,
  remove,
};
