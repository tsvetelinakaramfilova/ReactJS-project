import { useParams, Link } from "react-router-dom";
import { useGetOneArticle } from "../../hooks/useArticles";
import { useAuthContext } from "../../contexts/authContext";
import { Carousel } from "react-bootstrap";
import { TiArrowBack } from "react-icons/ti";
import ArticleTag from "../article-tag/ArticleTag";
import ArticleEditRemoveButton from "../article-edit-remove-button/ArticleEditRemoveButton";
import CommentSection from "../comment-section/CommentSection";
import Loader from "../loader/Loader";
import horizontelLogo from "../../assets/horizontel_logo.jpg";

export default function ArticleDetails() {
  const { articleId } = useParams();
  const { isAuthenticated, userId } = useAuthContext();
  const { article, isFetching } = useGetOneArticle(articleId);

  const imgArt = article.images?.filter((img) => img.trim() !== "") || [];
  const isOwner = userId === article._ownerId;

  return isFetching ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="mb-4 mt-2 d-flex justify-content-between">
        <Link to={"/articles"} className="text-dark btn-outline-secondary">
          <TiArrowBack />
        </Link>
        {isOwner && (
          <ArticleEditRemoveButton
            editLink={`/articles/edit/${articleId}`}
            deleteIdItem={articleId}
          />
        )}
      </div>
      <div className="page-title">
        <div className="row">
          <h3
            style={{ fontFamily: "Lora" }}
            className="card-title ms-1  mt-3 mb-0 text-center"
          >
            {article.name}
          </h3>
          <div className="text-end mt-2 mb-3">
            <ArticleTag tags={article.tags} />
          </div>
          <Carousel>
            {imgArt.length > 0 ? (
              imgArt.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="w-100 rounded"
                    src={image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://i.ibb.co/kMj0gfX/horizontel-logo.jpg";
                    }}
                    alt={image}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="w-100 rounded"
                  src={horizontelLogo}
                  alt="default"
                />
              </Carousel.Item>
            )}
          </Carousel>
          <div className="rounded-pill ms-auto text-end mt-3 mb-1">
            <div className="text-end text-muted">
              <p>
                From {new Date(article._createdOn).toLocaleDateString()}, Read{" "}
                {article.timeRead} min.
              </p>
            </div>
          </div>
          <div>
            <p>{article.description}</p>
          </div>
        </div>
      </div>
      <div>
        <CommentSection />
      </div>
    </div>
  );
}
