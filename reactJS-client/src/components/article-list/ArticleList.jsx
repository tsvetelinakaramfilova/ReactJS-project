import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/authContext";
import { useGetAllArticles } from "../../hooks/useArticles";
import ArticleListItem from "./article-list-item/ArticleListItem";
import Loader from "../loader/Loader";

export default function ArticleList() {
  const { articles, isFetching } = useGetAllArticles();
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation();

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : articles.length <= 0 ? (
        <div className="text-center mx-auto">
          <h5>{t("articlesInfo.noArticlesYet")}</h5>
          {isAuthenticated && (
            <Link to="/articles/create" className="btn btn-dark px-5">
              {t("articlesInfo.createArticle")}
            </Link>
          )}
        </div>
      ) : (
        articles.map((article) => {
          return <ArticleListItem key={article._id} article={article} />;
        })
      )}
    </>
  );
}
