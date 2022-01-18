import React, { useEffect, useState } from "react";
import { Anime } from "../types/list";
import Tier from "./tier";
import styles from "../styles/Tiers.module.css";
import { DragDropContext } from "react-beautiful-dnd";

const Tiers = ({ username }: { username: string }) => {
  const [data, setData] = useState<Array<Anime[]>>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/list/${username}`).then((r) =>
        r.json()
      );
      const sorted = sortLists(response.data);
      setData(sorted);
    };
    getData();
  }, [username]);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) {
      if (result.destination.index === result.source.index) return;

      const listIndex = getIndexFromLabel(result.destination.droppableId);
      const newList = [...data[listIndex]];
      const anime = newList[result.source.index];
      newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, anime);

      const newData = [...data];
      newData[listIndex] = newList;
      setData(newData);
      return;
    }

    const destinationIdx = getIndexFromLabel(result.destination.droppableId);
    const sourceIdx = getIndexFromLabel(result.source.droppableId);

    const destination = [...data[destinationIdx]];
    const source = [...data[sourceIdx]];

    const anime = source[result.source.index];
    source.splice(result.source.index, 1);

    destination.splice(result.destination.index, 0, anime);

    const newData = [...data];
    newData[destinationIdx] = destination;
    newData[sourceIdx] = source;
    setData(newData);
  }

  return (
    <div className={styles.list}>
      <DragDropContext onDragEnd={onDragEnd}>
        {data?.map((tier, i) => (
          <React.Fragment key={tier[0].node.title}>
            <Tier list={tier} index={i}></Tier>
          </React.Fragment>
        ))}
      </DragDropContext>
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

function getIndexFromLabel(label: string) {
  return label.charCodeAt(0) - 65;
}

export default React.memo(Tiers);
