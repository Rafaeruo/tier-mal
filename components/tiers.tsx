import { useEffect, useState } from "react";
import { Anime } from "../types/list";
import Tier from "./tier";
import styles from "../styles/Tiers.module.css";

const Tiers = () => {
  const [data, setData] = useState<Array<Anime[]>>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/list/rafaerux").then((r) => r.json());
      const sorted = sortLists(response.data);
      setData(sorted);
    };
    getData();
  }, []);

  return (
    <div className={styles.list}>
      {data?.map((tier, i) => (
        <Tier key={i} list={tier} index={i}></Tier>
      ))}
    </div>
  );
};

function sortLists(list: Anime[]): Array<Anime[]> {
  const result: Array<Anime[]> = [];
  let lastScore: number;
  list.forEach((anime) => {
    if (anime.list_status.score !== lastScore) {
      result.push([anime]);
      lastScore = anime.list_status.score;
    } else {
      result[result.length - 1].push(anime);
    }
  });

  return result;
}

export default Tiers;
