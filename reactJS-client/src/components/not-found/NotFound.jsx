import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="pb-5">
      <div
        className="d-flex justify-content-center 
                align-items-center flex-column 
                text-center w-100"
      >
        <div className={`${styles["bg_img"]}  w-50`}></div>
        <div>
          <Link
            to="/"
            className="text-white text-decoration-none px-4 py-3 
                    bg-dark d-inline-block mt-2 rounded"
          >
            {t("notFound.goToHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
