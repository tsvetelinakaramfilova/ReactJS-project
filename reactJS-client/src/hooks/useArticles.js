import { useFetch } from "./useFetch";
import articlesApi from "../api/articlesApi";

export function useGetAllArticles() {
  const { data: articles, isFetching } = useFetch(articlesApi.getAll(), []);

  return {
    articles,
    isFetching,
  };
}
