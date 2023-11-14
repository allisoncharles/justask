import styles from "../styles/PaymentComponent.module.css";
import { useRef, useState } from "react";
import Flutter from "../utils/flutter-wave";

const PaymentComponent = ({ user }) => {
  const [yearlyPayment, setYearlyPayment] = useState(false);
  const paymentToggleRef1 = useRef();
  const paymentToggleRef2 = useRef();

  const togglePayment1 = () => {
    paymentToggleRef1.current.setAttribute("payment-selected", "true");
    paymentToggleRef2.current.setAttribute("payment-selected", "false");
    setYearlyPayment(false);
  };

  const togglePayment2 = () => {
    paymentToggleRef2.current.setAttribute("payment-selected", "true");
    paymentToggleRef1.current.setAttribute("payment-selected", "false");
    setYearlyPayment(true);
  };

  return (
    <div className={styles.PaymentComponent}>
      <div className={styles.PaymentComponent__toggle__wrapper}>
        <div
          onClick={togglePayment1}
          payment-selected="true"
          className={styles.PaymentComponent__option}
          ref={paymentToggleRef1}
        >
          Monthly Billing
        </div>
        <div
          onClick={togglePayment2}
          className={styles.PaymentComponent__option}
          ref={paymentToggleRef2}
        >
          Annual Billing
        </div>
      </div>
      <h3 className={styles.PaymentComponent__desc}>
        Choose{" "}
        <span className={styles.PaymentComponent__promo}>annual billing</span>{" "}
        and get{" "}
        <span
          className={`${styles["PaymentComponent__promo"]} + ${styles["PaymentComponent__promo__back"]}`}
        >
          1 month free
        </span>
        .
      </h3>

      <div className={styles.PaymentComponent__pricing__wrapper}>
        {yearlyPayment ? (
          <>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Lite</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 500/yr
              </h2>
              <p>get up to 1M words</p>
              <Flutter
                name={user?.name}
                email={user?.email}
                amount={500}
                title="JustAsk Annual Lite Subscription"
              />
            </div>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Pro</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 5000/yr
              </h2>
              <p>get up to 10M tokens</p>
              <Flutter
                name={user?.name}
                email={user?.email}
                amount={5000}
                title="JustAsk Annual Pro Subscription"
              />
            </div>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Premium</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 50000/yr
              </h2>
              <p>get up to 100M tokens</p>
              <Flutter
                name={user?.name}
                email={user?.email}
                amount={50000}
                title="JustAsk Annual Premium Subscription"
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Lite</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 40/mo
              </h2>
              <p>get up to 1k tokens</p>
              <Flutter
                name={user?.name}
                email={user?.email}
                amount={40}
                title="JustAsk monthly Lite Subscription"
              />
            </div>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Pro</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 400/mo
              </h2>
              <p>get up to 10k tokens</p>

              <Flutter
                name={user?.name}
                email={user?.email}
                amount={400}
                title="JustAsk Monthly Pro Subscription"
              />
            </div>
            <div className={styles.PaymentComponent__pricing__item}>
              <h2 className={styles.PaymentComponent__price__head}>Premium</h2>
              <h2 className={styles.PaymentComponent__price__fig}>
                NGN. 4000/mo
              </h2>
              <p>get up to 100k tokens</p>

              <Flutter
                name={user?.name}
                email={user?.email}
                amount={4000}
                title="JustAsk Monthly Premium Subscription"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
