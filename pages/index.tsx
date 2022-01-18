import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Tiers from "../components/tiers";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [username, input, setUsername] = useUsername("", 1000);

  return (
    <div>
      <Head>
        <title>Tier MAL</title>
        <meta name="description" content="MyAnimeList Tier Lists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Tier MAL</h1>

        <input
          type="text"
          value={input}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Tiers username={username}></Tiers>
      </main>
    </div>
  );
};

//username debounce hook
function useUsername(
  value: string,
  debounce: number
): [string, string, (username: string) => void] {
  const [username, setUsername] = useState(value);
  const [input, setInput] = useState(value);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  function onUsernameChange(username: string) {
    setInput(username);
    const timeout = setTimeout(() => {
      setUsername(username);
    }, debounce);
    if (currentTimeout) clearTimeout(currentTimeout);
    setCurrentTimeout(timeout);
  }

  return [username, input, onUsernameChange];
}

export default Home;
