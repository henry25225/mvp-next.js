import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function ArticleCard({ article, ...props }) {
  return (
    <Card {...props}>
      <Card.Img variant="top" src={article.image} height={200} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.meta_description}</Card.Text>
        <Link href={`/article/${article.id}`}>
          <Button variant="outline-primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
