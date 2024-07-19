import Badge from "react-bootstrap/Badge";

export default function ArticleTag({ tags }) {
  return tags.map((tag) => {
    return (
      <>
        <Badge pill bg="success" className="mx-1">
          {tag}
        </Badge>
      </>
    );
  });
}
