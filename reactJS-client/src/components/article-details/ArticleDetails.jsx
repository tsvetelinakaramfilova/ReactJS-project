import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Carousel } from "react-bootstrap";
import { TiArrowBack } from "react-icons/ti";
import articlesApi from "../../api/articles-api";
import ArticleTag from "../article-tag/ArticleTag";
import EditRemoveButton from "../edit-remove-button/EditRemoveButton";
import CommentSection from "../comment-section/CommentSection";

export default function ArticleDetails() {
  const { articleId } = useParams();

  //   const { data: article, isFetching } = useFetch(
  //     `http://localhost:3030/jsonstore/articles/${articleId}`,
  //     {}
  //   );

  const { data: article, isFetching } = useFetch(
    articlesApi.getOne(articleId),
    {}
  );

  const imgArt = article.images || [];

  console.log(article);

  return (
    <div className="container">
      {/* <StarRating /> */}
      <div className="mb-4 mt-2 d-flex justify-content-between">
        <Link to={"/articles"} className="text-dark btn-outline-secondary">
          <TiArrowBack />
        </Link>
        {/* Only author see these: */}
        <EditRemoveButton
          editTo={"/articleForm"}
          deleteToSucces={"/articles"}
        />
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
                  <img className="w-100 rounded" src={image} alt={image} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="w-100 rounded"
                  src="https://i.ibb.co/kMj0gfX/horizontel-logo.jpg"
                  alt="default"
                />
              </Carousel.Item>
            )}
          </Carousel>
          <div className="rounded-pill ms-auto text-end mt-3 mb-1">
            <div className="text-end text-muted">
              <p>
                From {new Date(article.dateOfEntry).toLocaleDateString()}, Read{" "}
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
        <CommentSection comments={article.comments} />
      </div>
    </div>
  );
}
