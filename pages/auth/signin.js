import styles from "../../styles/SignIn.module.css";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from "react";

const signIn = ({ providers }) => {
  return (
    <div className={styles.signin}>
      <Navbar />
      <div className={styles.signin__wrapper}>
        <h2 className={styles.signin__icon__text}>
          Just<span className={styles.signin__icon__age}>Ask</span>
        </h2>

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.signin__btn}
              onClick={() =>
                signIntoProvider(provider.id, { callbackUrl: "/ask" })
              }
            >
              Sign In with {provider.name}
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
