export type EditorLayout = {
  groups?: EditorLayoutGroup[];
  /* 0 - horizontal , 1 - vertical */
  orientation: 0 | 1;
};

type EditorLayoutGroup = {
  groups?: EditorLayoutGroup[];
  size: number;
};
