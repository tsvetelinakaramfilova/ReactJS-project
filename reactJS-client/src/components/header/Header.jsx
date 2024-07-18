import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import brandLogo from "../../assets/Logo_f.png";

export default function Header() {
  const isAuthenticated = false;

  const navigation = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/articles",
      title: "Articles",
    },
  ];

  const navGuest = [
    {
      to: "/login",
      title: "Log In",
    },
    {
      to: "/registration",
      title: "Registration",
    },
  ];

  const navUser = [
    {
      to: "/addArticle",
      title: "Add Article",
    },
    {
      to: "/logout",
      title: "Log Out",
    },
  ];

  const getNav = (item) => {
    return (
      <Nav.Link key={item.title} href={item.to}>
        {item.title}
      </Nav.Link>
    );
  };

  return (
    <>
      {/* data-bs-theme="dark" - dark mode */}
      <Navbar
        bg="light"
        data-bs-theme="light"
        expand="lg"
        className="mb-2 mb-md-5"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={brandLogo}
              alt="logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-toggler collapsed" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navigation.map((item) => getNav(item))}
              {isAuthenticated
                ? navUser.map((item) => getNav(item))
                : navGuest.map((item) => getNav(item))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
