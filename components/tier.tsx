import Image from "next/image";
import { Anime } from "../types/list";
import styles from "../styles/Tier.module.css";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { areEqual, FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const animeWidth = 128;
const animeHeight = 199;

const Row = memo(function Row({ data: list, index, style }: any) {
  const anime: Anime = list[index];

  return (
    <Draggable
      draggableId={anime.node.id.toString()}
      index={index}
      key={anime.node.id.toString()}
    >
      {(provided, snapshot) => (
        <Anime
          provided={provided}
          anime={list[index]}
          style={style}
          isDragging={snapshot.isDragging}
        />
      )}
    </Draggable>
  );
}, areEqual);

const Tier = ({ list, label }: { list: Anime[]; label: string }) => {
  return (
    <div className={styles.tier}>
      <div className={styles.label}>{label}</div>

      <Droppable
        droppableId={label}
        direction="horizontal"
        mode="virtual"
        renderClone={(provided, _snapshot, rubric) => (
          <Anime
            provided={provided}
            style={{}}
            anime={list[rubric.source.index]}
          />
        )}
      >
        {(provided) => (
          <AutoSizer disableHeight={true}>
            {({ width }) => (
              <List
                height={animeHeight + 19}
                itemCount={list.length}
                itemSize={animeWidth}
                width={width - 80 - 10 - 10} //100vw - label width - label margin - right margin
                outerRef={provided.innerRef}
                itemData={list}
                layout="horizontal"
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </Droppable>
    </div>
  );
};

function Anime({ anime, provided, style, isDragging }: any) {
  return (
    <div
      key={anime.node.id}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle({ provided, style, isDragging })}
    >
      <Image
        className={styles.img}
        src={anime.node.main_picture.medium}
        alt={anime.node.title}
        width={animeWidth}
        height={animeHeight}
        layout="fixed"
      />
    </div>
  );
}

function getStyle({ provided, style, isDragging }: any) {
  const combined = {
    ...style,
    ...provided.draggableProps.style,
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    marginBottom,
  };
  return withSpacing;
}

export default Tier;
