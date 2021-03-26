import styles from "../styles/Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import request from "../utils/request";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { register, handleSubmit, setError, clearErrors, errors } = useForm();
  const router = useRouter()

  const onSubmit = async (form) => {
    clearErrors();
    try {
      const { data } = await request.post("/login", form);
      localStorage.setItem("auth", JSON.stringify(data.data));
      router.replace("/");
    } catch (e) {
      Object.entries(e.response.data?.metaData?.errors ?? {}).forEach(
        ([key, value]) => {
          setError(key, {
            type: "server",
            message: value[0],
          });
        }
      );
    }
  };

  return (
    <div className={styles.root}>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="login">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" name="login" ref={register} />
                    {errors.login && (
                      <Form.Text className="text-danger">
                        {errors.login.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      ref={register}
                    />
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                  <Link href="/register">
                    <Button variant="link" className="ml-3">
                      Register
                    </Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
