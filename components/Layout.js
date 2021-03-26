import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";
import Link from "next/link";

export default function Layout({ children }) {
  const router = useRouter();
  const { data: menus } = useSWR("/menu/app-main");
  const auth = useAuth();

  // if (!auth && typeof window !== "undefined") {
  //   router.replace("/login");
  // }

  const logout = () => {
    localStorage.removeItem("auth");
    router.replace("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Newsifier</Navbar.Brand>
          </Link>
          <Nav className="mr-auto">
            {menus?.map((menu) => (
              <Nav.Link key={menu.id} href="#">
                {menu.name}
              </Nav.Link>
            ))}
            {typeof window !== "undefined" ? (
              auth ? (
                <NavDropdown title={auth?.username ?? ""} className="ml-auto">
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link href="/login" passHref>
                  <Nav.Link className="ml-auto">Login</Nav.Link>
                </Link>
              )
            ) : null}
          </Nav>
        </Container>
      </Navbar>
      <Container className="py-5">{children}</Container>
    </>
  );
}
