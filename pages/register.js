import styles from "../styles/Register.module.css";
import { useForm } from "react-hook-form";
import request from "../utils/request";
import Link from "next/link";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RegisterPage() {
  const { register, handleSubmit, setError, clearErrors, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (form) => {
    clearErrors();
    try {
      const { data } = await request.post("/register", form);
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
              <Card.Header>Register</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" ref={register} />
                    {errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" ref={register} />
                    {errors.username && (
                      <Form.Text className="text-danger">
                        {errors.username.message}
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
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password_confirmation"
                      ref={register}
                    />
                    {errors.password_confirmation && (
                      <Form.Text className="text-danger">
                        {errors.password_confirmation.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                  <Link href="/login">
                    <Button variant="link" className="ml-3">
                      Login
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