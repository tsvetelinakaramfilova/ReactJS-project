import { useFetch } from "./useFetch";
import articlesApi from "../api/articlesApi";

export function useGetAllArticles() {
  const {
    data: articles,
    setData: setArticles,
    isFetching,
  } = useFetch(articlesApi.getAll(), []);

  return {
    articles,
    setArticles,
    isFetching,
  };
}

export function useGetLastThirdArticles() {
  const { data: articles, isFetching } = useFetch(
    articlesApi.getLastThird(),
    []
  );

  return {
    articles,
    isFetching,
  };
}

export function useMyArticles(userId) {
  const { data: articles, isFetching } = useFetch(
    articlesApi.getMy(userId),
    []
  );

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

export function useCreateArticle() {
  const articleCreateHandler = (articleData) => articlesApi.create(articleData);

  return articleCreateHandler;
}

export function useEditArticle() {
  const articleEditHandler = (articleId, articleData) =>
    articlesApi.edit(articleId, articleData);

  return articleEditHandler;
}

export function useRemoveArticle() {
  const articleRemoveHandler = (articleId) => articlesApi.remove(articleId);

  return articleRemoveHandler;
}
