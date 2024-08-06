import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/authContext";
import { useMyArticles } from "../../hooks/useArticles";
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
          <h5>{t("articlesInfo.noArticlesYet")}</h5>

          <Link to="/articles/create" className="btn btn-dark px-5">
            {t("articlesInfo.createArticle")}
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
