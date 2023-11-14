import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";
import { getUser } from "../../client/requests";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = ({ user, session }) => {
  return (
    <div className={styles.profile}>
      <Navbar />
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__container}>
          <div className={styles.profile__img__container}>
            <Image
              className={styles.profile__img}
              src={session.user.image}
              alt=""
              layout="fill"
            />
          </div>

          <div className={styles.profile__details}>
            <p className={styles.profile__name}>{session.user.name}</p>
            <p className={styles.profile__email}>{user.email}</p>
            <div className={styles.profile__tokens}>
              <p className={styles.profile__token}>Tokens Left:</p>
              <p className={styles.profile__token__value}>
                {user.access} Tokens
              </p>
            </div>
          </div>

          <button onClick={() => signOut()} className={styles.profile__btn}>
            Sign out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }

  const userFromDB = await getUser(session.user.email);
  const user = userFromDB.data;

  return {
    props: { session, user },
  };
};
