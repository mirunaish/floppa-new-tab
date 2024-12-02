export interface Coords {
  x: number;
  y: number;
}

export interface Size {
  width: number | string;
  height: number | string;
}

export interface Interval {
  min: number;
  max: number;
}

export interface ImageInfo {
  id: string;
  title: string;
  url: string;
}

export interface NoteInfo {
  id: string;
  title: string;
  text: string;
}
