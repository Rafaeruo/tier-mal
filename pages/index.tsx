import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Tiers from "../components/tiers";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { query } = useRouter();
  let usernameParam = typeof query.u !== "string" || !query.u ? "" : query.u;
  const [username, input, setUsername] = useUsername(usernameParam, 1000);

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
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
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

  //update state on prop change
  useEffect(() => {
    setInput(value);
    setUsername(value);
  }, [value]);

  return [username, input, onUsernameChange];
}

export default Home;
