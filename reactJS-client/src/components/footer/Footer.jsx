import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  const isAuthenticated = false;

  const informationLink = [
    {
      to: "/",
      title: "About Us",
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

  const getLinks = (link) => {
    return link.map((link) => {
      return (
        <li className="nav-item mb-2" key={link.title}>
          <Link to={link.to} className="nav-link p-0 text-muted">
            {link.title}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="container footer mt-auto py-3">
      <footer className="justify-content-between align-items-center py-3 my-4 border-top">
        <div className="row justify-content-between mx-4">
          <div className="my-2 col-lg-3">
            <ul className="nav flex-column">{getLinks(informationLink)}</ul>
          </div>

          <div className="my-2 col-lg-3">
            <ul className="nav flex-column">
              {isAuthenticated ? getLinks(navUser) : getLinks(navGuest)}
            </ul>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 mt-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb- me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <svg className="bi" width="30" height="24"></svg>
            </Link>
            <span className="text-muted">© 2024</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link className="text-muted" to="/">
                <svg className="bi" width="24" height="24">
                  <BsTwitter />
                </svg>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" to="/">
                <svg className="bi" width="24" height="24">
                  <BsInstagram />
                </svg>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-muted" to="/">
                <svg className="bi" width="24" height="24">
                  <BsFacebook />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
