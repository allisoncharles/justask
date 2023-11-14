import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JustAsk</title>
        <link rel="icon" href="/images/ja.png" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <Featured />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
