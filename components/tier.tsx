import Image from "next/image";
import { Anime } from "../types/list";
import styles from "../styles/Tier.module.css";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Tier = ({ list, label }: { list: Anime[]; label: string }) => {
  return (
    <div className={styles.tier}>
      <div className={styles.label}>{label}</div>

      <Droppable droppableId={label} direction="horizontal">
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

export default Tier;
