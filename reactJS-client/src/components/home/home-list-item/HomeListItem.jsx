import { Link } from "react-router-dom";

export default function HomeListItem({ article }) {
  const imageSrc =
    article.images && article.images.length > 0
      ? article.images[0]
      : "https://i.ibb.co/kMj0gfX/horizontel-logo.jpg";

  return (
    <div className="col">
      <div className="card h-100 shadow-sm p-3 mb-5 bg-body rounded">
        <img
          src={imageSrc}
          alt="imageSrc"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://i.ibb.co/kMj0gfX/horizontel-logo.jpg";
          }}
          className="card-img-top my-3"
        />
        <div className="card-body d-grid align-item-end">
          <h5 className="card-title">{article.name}</h5>
          <p className="card-text text-end mb-1">
            {new Date(article._createdOn).toLocaleDateString()}
          </p>
          <p className="card-text">{article.description}</p>
          <Link
            to={`/articles/details/${article._id}`}
            className="btn btn-dark my-auto"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}
