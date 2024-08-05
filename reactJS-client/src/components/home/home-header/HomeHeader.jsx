import { Link } from "react-router-dom";
import brandLogo from "../../../assets/Logo_f.png";
import { useTranslation } from "react-i18next";

export default function HomeHeader() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="section hero my-2">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>{t("homePage.article")}</h1>
            <p>{t("homePage.readMoteIntArticles")}</p>
            <div className="d-flex">
              <Link to="/articles" className="btn btn-dark">
                {t("homePage.moreArticles")}
              </Link>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img text-center">
            <img src={brandLogo} className="img-fluid w-50" alt="ArticleLogo" />
          </div>
        </div>
      </div>
    </section>
  );
}
