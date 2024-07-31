import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
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
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
