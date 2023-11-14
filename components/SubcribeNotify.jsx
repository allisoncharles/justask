import styles from "../styles/SubcribeNotify.module.css";
import { useRouter } from "next/router";

const SubcribeNotify = () => {
  const router = useRouter();

  return (
    <div className={styles.subscribe__notify}>
      <div className={styles.subscribe__notify__container}>
        <div className={styles.subscribe__notify__box}>
          <div className={styles.subscribe__notify__header__wrapper}>
            <svg className={styles.broken__icon}>
              <use xlinkHref="/svg/hourglass.svg#hourglass"></use>
            </svg>
            <p className={styles.subscribe__notify__header}>
              Whoops, Free trial expired.
            </p>
          </div>

          <p className={styles.subscribe__notify__note}>
            Hi there, your free trial has expired, click on the{" "}
            <span>subcribe button</span> to keep enjoying our service.
          </p>

          <div className={styles.subscribe__notify__btn__wrapper}>
            <button
              onClick={() => router.push("/subscribe")}
              className={`${styles["sub_button"]} ${styles["btn"]}`}
            >
              Subscribe
            </button>
            <button
              onClick={() => router.push("/")}
              className={`${styles["back_button"]} ${styles["btn"]}`}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcribeNotify;
