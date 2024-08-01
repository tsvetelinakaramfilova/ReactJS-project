import requester from "./requester";

const BASE_URL = "http://localhost:3030/data/commentsArticles";

const getAll = (articleId) => {
  const params = new URLSearchParams({
    where: `articleId="${articleId}"`,
    load: `author=_ownerId:users`,
  });
  const result = requester.get(`${BASE_URL}?${params.toString()}`);

  return result;
};

const create = (articleId, commentText) =>
  requester.post(BASE_URL, { articleId, commentText });

const remove = (commentId) => requester.remove(`${BASE_URL}/${commentId}`);

export default {
  getAll,
  create,
  remove,
};
