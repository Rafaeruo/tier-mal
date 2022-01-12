import type { NextPage } from "next";
import Head from "next/head";
import Tiers from "../components/tiers";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tier MAL</title>
        <meta name="description" content="MyAnimeList Tier Lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Tier MAL</h1>
        <Tiers></Tiers>
      </main>
    </div>
  );
};

export default Home;
