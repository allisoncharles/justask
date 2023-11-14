import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaymentComponent from "../../components/PaymentComponent";
import { getSession } from "next-auth/react";

const Payment = ({ user }) => {
  return (
    <div>
      <Navbar />
      <PaymentComponent user={user} />
      <Footer />
    </div>
  );
};

export default Payment;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: session,
  };
};
