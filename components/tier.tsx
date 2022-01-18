import Image from "next/image";
import { Anime } from "../types/list";
import styles from "../styles/Tier.module.css";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Tier = ({ list, index }: { list: Anime[]; index: number }) => {
  const [label, setLabel] = useState<string>("");
  useEffect(() => {
    setLabel(getLabel(index));
  }, [index]);
  return (
    <div className={styles.tier}>
      <div>{label}</div>

      <Droppable droppableId={label || index.toString()} direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.list}
          >
            {list.map((anime, i) => (
              <Draggable
                key={anime.node.id.toString()}
                draggableId={anime.node.id.toString()}
                index={i}
              >
                {(provided) => (
                  <div
                    key={anime.node.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Image
                      className={styles.img}
                      src={anime.node.main_picture.medium}
                      alt={anime.node.title}
                      width={128}
                      height={199}
                      layout="fixed"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

function getLabel(n: number) {
  return String.fromCharCode(65 + n);
}

export default Tier;
