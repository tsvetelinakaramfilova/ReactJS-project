import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import brandLogo from "../../assets/Logo_f.png";
import { useAuthContext } from "../../contexts/authContext";
import LanguageSwitch from "./language-switch/LanguageSwitch";

export default function Header() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthContext();

  const navigation = [
    {
      to: "/",
      title: t("home"),
    },
    {
      to: "/articles",
      title: t("articles"),
    },
  ];

  const navGuest = [
    {
      to: "/login",
      title: t("login"),
    },
    {
      to: "/registration",
      title: t("registration"),
    },
  ];

  const navUser = [
    {
      to: "/articles/create",
      title: t("addArticle"),
    },
    {
      to: "/logout",
      title: t("logout"),
    },
  ];

  const getNav = (item) => {
    return (
      <Nav.Link as={Link} key={item.title} to={item.to}>
        {item.title}
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar
        bg="light"
        data-bs-theme="light"
        expand="lg"
        className="mb-2 mb-md-5"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
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
            <Nav className="me-auto">
              {navigation.map((item) => getNav(item))}
              {isAuthenticated
                ? navUser.map((item) => getNav(item))
                : navGuest.map((item) => getNav(item))}
            </Nav>
            <Nav className="ml-2 ms-auto">
              <LanguageSwitch />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
