import request from "../../utils/request";
import dynamic from "next/dynamic";

const Comments = dynamic(() => import("../../components/Comments"));
const Articles = dynamic(() => import("../../components/Articles"));
const Layout = dynamic(() => import("../../components/Layout"));
const Row = dynamic(() => import("react-bootstrap/Row"));
const Col = dynamic(() => import("react-bootstrap/Col"));

export default function ArticlePage({ article }) {
  return (
    <Layout>
      <Row>
        <Col md={8}>
          <h1>{article.title}</h1>
          <p>
            <i>Written by</i> <b>{article.author.name}</b>
          </p>
          <img src={article.image} className="w-100" />
          <p className="mt-3">{article.meta_description}</p>
          <Comments article={article} />
        </Col>
        <Col md={4}>
          <Articles />
        </Col>
      </Row>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articles = await request.get("/article?limit=60").then((r) => r.data.data);
  return {
    paths: articles.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = await request
    .get(`/article-as-visitor/${params.id}`)
    .then((r) => r.data.data);

  return {
    props: {
      article,
    },
  };
}
