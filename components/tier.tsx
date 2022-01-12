import Image from "next/image";
import { Anime } from "../types/list";
import styles from "../styles/Tier.module.css";
import { useEffect, useState } from "react";

const Tier = ({ list, index }: { list: Anime[]; index: number }) => {
  const [label, setLabel] = useState<string>("");
  useEffect(() => {
    setLabel(getLabel(index));
  }, [index]);

  return (
    <div className={styles.tier}>
      <div>{label}</div>
      <div className={styles.list}>
        {list.map((anime) => (
          <Image
            key={anime.node.title}
            src={anime.node.main_picture.medium}
            alt={anime.node.title}
            width={128}
            height={199}
            layout="fixed"
          />
        ))}
      </div>
    </div>
  );
};

function getLabel(n: number) {
  return String.fromCharCode(65 + n);
}

export default Tier;
