import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          (c) Copyright JustAsk 2023. All rights reserved
        </a>
      </div>
    </div>
  );
};

export default Footer;
