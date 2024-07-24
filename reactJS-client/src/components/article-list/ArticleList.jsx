import { useFetch } from "../../hooks/useFetch";
import articlesApi from "../../api/articles-api";
import ArticleListItem from "./article-list-item/ArticleListItem";

export default function ArticleList() {
  const { data: articles, isFetching } = useFetch(articlesApi.getAll(), []);
  // console.log(articles);

  return (
    <>
      {articles.map((article) => {
        return <ArticleListItem key={article._id} article={article} />;
      })}
    </>
  );
}
