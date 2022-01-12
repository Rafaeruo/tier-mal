import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/list/rafaerux").then((r) => r.json());
      setData(response.data);
    };
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Tier MAL</title>
        <meta name="description" content="MyAnimeList Tier Lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Tier MAL</h1>
        {JSON.stringify(data)}
      </main>
    </div>
  );
};

export default Home;
