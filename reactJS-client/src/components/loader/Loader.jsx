import styles from "./Loader.module.css";

export default function Loader() {
  return <div className={`${styles["loader"]} mx-auto my-3`}></div>;
}
