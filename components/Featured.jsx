import styles from "../styles/Featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className={styles.featured}>
      <div className={styles.featured__container}>
        <div className={styles.featured__text__wrapper}>
          <h1 className={styles.featured__header}>
            Welcome to{" "}
            <span className={styles.featured__main__head}>
              Just<span className={styles.featured__icon__age}>Ask</span>
            </span>
          </h1>
          <div className={styles.featured__text__container}>
            <p className={styles.featured__text}>
              We are here to help you find the information you need quickly and
              easily. Our systems are implemented with an AI that is designed to
              provide you with the most relevant results for your queries.
            </p>
            <p>
              So, what are you waiting for? Hit the Ask button now and get the
              answers you need!
            </p>

            <Link href="/ask">
              <div className={styles.featured__btn__container}>
                <button className={styles.featured__btn}>Ask</button>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.featured__image__container}>
          <Image
            className={styles.featured__image}
            src="/images/ai.jpg"
            layout="fill"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
