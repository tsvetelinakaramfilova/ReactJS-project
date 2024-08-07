import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/authContext";
import { useMyArticles } from "../../hooks/useArticles";
import { RiFileAddLine } from "react-icons/ri";
import ArticleListItem from "../article-list/article-list-item/ArticleListItem";
import Loader from "../loader/Loader";

export default function ArticleMy() {
  const { t } = useTranslation();
  const { userId } = useAuthContext();
  const { articles, isFetching } = useMyArticles(userId);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : articles.length <= 0 ? (
        <div className="text-center mx-auto">
          <Link to="/articles/create" className="btn btn-dark px-5">
            {t("articlesInfo.createArticle")}
          </Link>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            <Link to="/articles/create" className="text-dark btn-outline-secondary">
              <RiFileAddLine />
            </Link>
          </div>
          {articles.map((article) => {
            return <ArticleListItem key={article._id} article={article} />;
          })}
        </div>
      )}
    </>
  );
}
