import { getSession } from "next-auth/react";
import { getUser, getUsers } from "../../client/requests";
import UsersComponent from "../../components/UsersComponent";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/admin.module.css";

const Admin = ({ usersRes }) => {
  return (
    <div className={styles.admin}>
      <Navbar />
      <UsersComponent usersRes={usersRes} />
      <Footer />
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

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

    const users = await getUsers();

    return {
      props: { usersRes: users.data },
    };
  }
}
