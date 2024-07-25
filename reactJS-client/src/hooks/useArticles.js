import { useFetch } from "./useFetch";
import articlesApi from "../api/articlesApi";

export function useGetAllArticles() {
  const { data: articles, isFetching } = useFetch(articlesApi.getAll(), []);

  return {
    articles,
    isFetching,
  };
}

export function useGetOneArticle(articleId) {
  const {
    data: article,
    setData: setArticle,
    isFetching,
  } = useFetch(articlesApi.getOne(articleId), {}, articleId);

  return {
    article,
    setArticle,
    isFetching,
  };
}
