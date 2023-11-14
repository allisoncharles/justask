import { getSession } from "next-auth/react";
import { getUser } from "../../client/requests";
import UserComponent from "../../components/UserComponent";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/admin.module.css";

const EditUser = ({ userRes }) => {
  return (
    <div className={styles.admin}>
      <Navbar />
      <UserComponent userRes={userRes} />
      <Footer />
    </div>
  );
};

export default EditUser;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const email = context.params.email;
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  } else {
    const res = await getUser(session.user.email);
    const isAdmin = res.data.isAdmin;

    if (!isAdmin) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const user = await getUser(email);

    return {
      props: { userRes: user.data },
    };
  }
}
