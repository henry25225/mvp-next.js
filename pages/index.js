import request from "../utils/request";
import { useSWRInfinite } from "swr";
import dynamic from "next/dynamic";

const ArticleCard = dynamic(() => import("../components/ArticleCard"));
const Layout = dynamic(() => import("../components/Layout"));
const Button = dynamic(() => import("react-bootstrap/Button"));
const Row = dynamic(() => import("react-bootstrap/Row"));
const Col = dynamic(() => import("react-bootstrap/Col"));

const LIMIT = 6;

export default function HomePage(props) {
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/article?page=${index + 1}&limit=${LIMIT}`,
    {
      initialData: [props.articles],
    }
  );
  const articles = data ? [].concat(...data) : [];

  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  return (
    <Layout>
      <Row>
        {articles.map((article) => (
          <Col key={article.id} xl={4} lg={6} className="mb-4">
            <ArticleCard article={article} className="h-100" />
          </Col>
        ))}
      </Row>
      {!isReachingEnd && (
        <div className="d-flex justify-content-center">
          <Button
            variant="secondary"
            disabled={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await request
    .get(`/article?limit=${LIMIT}`)
    .then((r) => r.data.data);

  return {
    props: {
      articles,
    },
  };
}
