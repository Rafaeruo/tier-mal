export interface Anime {
  node: AnimeNode;
  list_status: AnimeListStatus;
}

export interface AnimeNode {
  id: number;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };
}

export interface AnimeListStatus {
  status: Status;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
}

enum Status {
  PlanToWatch = "plan_to_watch",
  Watching = "watching",
  Completed = "completed",
  Dropped = "dropped",
}

// {
//     "node": {
//         "id": 41457,
//         "title": "86",
//         "main_picture": {
//             "medium": "https:\/\/api-cdn.myanimelist.net\/images\/anime\/1987\/117507.jpg",
//             "large": "https:\/\/api-cdn.myanimelist.net\/images\/anime\/1987\/117507l.jpg"
//         }
//     },
//     "list_status": {
//         "status": "dropped",
//         "score": 0,
//         "num_episodes_watched": 5,
//         "is_rewatching": false,
//         "updated_at": "2021-09-12T00:43:14+00:00"
//     }
// },
