import Badge from "react-bootstrap/Badge";

export default function ArticleTag({ tags }) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }
  
  return tags.map((tag) => {
    return (
      <Badge key={tag} pill bg="success" className="mx-1">
        {tag}
      </Badge>
    );
  });
}
