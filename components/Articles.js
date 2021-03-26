import useSWR from "swr";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const { data: articles } = useSWR("/article?limit=3");

  return (
    <>
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} className="mb-4" />
      ))}
    </>
  );
}
