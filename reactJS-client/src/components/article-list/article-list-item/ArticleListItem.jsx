import { Link } from "react-router-dom";
import styles from "./ArticleListItem.module.css";
import ArticleTag from "../../article-tag/ArticleTag";

export default function ArticleListItem({ article }) {
  const imageSrc = article.images[0];

  return (
    <>
      <div className="card my-4 shadow-sm p-3 mb-5 bg-body rounded">
        <div className="row">
          <div className="col-lg-4 text-center my-auto">
            <img
              src={imageSrc}
              alt="imageSrc"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://i.ibb.co/kMj0gfX/horizontel-logo.jpg";
              }}
              className="img-fluid rounded ms-lg-3 py-3"
            />
          </div>
          <div className="col-lg-8 text-center my-auto">
            <div className="card-body">
              <Link
                to={`/articles/details/${article._id}`}
                className={styles["link-item"]}
              >
                <div className="flex-grow-1 d-lg-flex align-items-center mb-2">
                  <h5 className="card-title ms-1 mb-0">{article.name}</h5>
                  <div className="rounded-pill ms-auto text-end my-2">
                    <ArticleTag tags={article.tags} />
                  </div>
                </div>
                <p className="card-text my-1 text-truncate text-start">
                  {article.description}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
