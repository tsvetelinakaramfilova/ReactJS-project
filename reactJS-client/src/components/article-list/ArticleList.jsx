import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import articlesApi from "../../api/articles-api";
import ArticleListItem from "./article-list-item/ArticleListItem";
import Loader from "../loader/Loader";

export default function ArticleList() {
  const { data: articles, isFetching } = useFetch(articlesApi.getAll(), []);
  // console.log(articles);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : articles.length <= 0 ? (
        <div className="text-center mx-auto">
          <h5>No articles yet</h5>
          <Link to="/articles/create" className="btn btn-dark px-5">
            Create article
          </Link>
        </div>
      ) : (
        articles.map((article) => {
          return <ArticleListItem key={article._id} article={article} />;
        })
      )}
    </>
  );
}
