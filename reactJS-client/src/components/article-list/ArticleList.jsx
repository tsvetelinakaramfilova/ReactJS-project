import { Link } from "react-router-dom";
import { useGetAllArticles } from "../../hooks/useArticles";
import ArticleListItem from "./article-list-item/ArticleListItem";
import Loader from "../loader/Loader";
import { useAuthContext } from "../../contexts/authContext";

export default function ArticleList() {
  const { articles, isFetching } = useGetAllArticles();
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : articles.length <= 0 ? (
        <div className="text-center mx-auto">
          <h5>No articles yet</h5>
          {isAuthenticated && (
            <Link to="/articles/create" className="btn btn-dark px-5">
              Create article
            </Link>
          )}
        </div>
      ) : (
        articles.map((article) => {
          return <ArticleListItem key={article._id} article={article}/>;
        })
      )}
    </>
  );
}
