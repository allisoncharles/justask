import React from "react";
import styles from "../styles/Flutter.module.css";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function App({ amount, name, email, title }) {
  const config = {
    public_key: "FLWPUBK_TEST-0fb097d3131d7836aefe18f6dea2cdb7-X",
    tx_ref: Date.now(),
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: process.env.BASE_URL,
    customer: {
      email,
      phone_number: "070********",
      name,
    },
    customizations: {
      title,
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      className={styles.Flutter__button}
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      }}
    >
      Get Started
    </button>
  );
}
