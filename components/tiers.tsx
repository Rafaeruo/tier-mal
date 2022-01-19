import React, { useEffect, useState } from "react";
import { Anime } from "../types/list";
import Tier from "./tier";
import styles from "../styles/Tiers.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const mapping: TierScoreMapping = {
  A: 9,
  B: 7,
  C: 5,
  D: 3,
  E: 1,
};

const Tiers = ({ username }: { username: string }) => {
  const [tiers, setTiers] = useState<Tiers>({});

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(`/api/list/${username}`).then((r) =>
        r.json()
      );
      console.log(response.data);
      setTiers(mapAnimeToTiers(response.data));
    };
    fetchAnime();
  }, [username]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    // same tier
    if (result.destination.droppableId === result.source.droppableId) {
      if (result.destination.index === result.source.index) return;

      const tier = result.destination.droppableId;
      const newTier = [...tiers[tier]];

      const target = newTier[result.source.index];
      newTier.splice(result.source.index, 1);
      newTier.splice(result.destination.index, 0, target);

      const newTiers = {
        ...tiers,
        [tier]: newTier,
      };
      setTiers(newTiers);
      return;
    }

    // different tiers
    const sourceTier = result.source.droppableId;
    const destinationTier = result.destination.droppableId;

    const newSource = [...tiers[sourceTier]];
    const newDestination = [...tiers[destinationTier]];

    const target = newSource[result.source.index];
    newSource.splice(result.source.index, 1);
    newDestination.splice(result.destination.index, 0, target);

    const newTiers = {
      ...tiers,
      [sourceTier]: newSource,
      [destinationTier]: newDestination,
    };
    setTiers(newTiers);
  }

  return (
    <div className={styles.list}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(tiers)?.map((key, i) => {
          const tier = tiers[key];
          return (
            <React.Fragment key={key}>
              <Tier list={tier} label={key}></Tier>
            </React.Fragment>
          );
        })}
      </DragDropContext>
    </div>
  );
};

function mapAnimeToTiers(list: Anime[]): Tiers {
  const result: { [key: string]: Anime[] } = {};
  let idx = 0;

  Object.keys(mapping).forEach((key) => {
    result[key] = [];
    let anime = list[idx];
    while (mapping[key] <= anime.list_status.score) {
      result[key].push(anime);
      idx += 1;
      anime = list[idx];
    }
  });

  return result;
}
interface Tiers {
  [key: string]: Anime[];
}

interface TierScoreMapping {
  [key: string]: number;
}

export default React.memo(Tiers);
