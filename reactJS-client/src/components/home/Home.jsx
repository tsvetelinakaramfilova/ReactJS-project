import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { useGetLastThirdArticles } from "../../hooks/useArticles";
import HomeListItem from "./home-list-item/HomeListItem";
import Loader from "../loader/Loader";

export default function Home() {
  const { articles, isFetching } = useGetLastThirdArticles();
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
        <div>
          <h2 className="mb-4">Last third articles</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {articles.map((article) => {
              return <HomeListItem key={article._id} article={article} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
