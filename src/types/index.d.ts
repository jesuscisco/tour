// src/types/index.d.ts
interface Point {
  x: number;
  y: number;
}

interface Polygon {
  points: Point[];
}

interface Room {
  id: string;
  name: string;
  description: string;
  position: Point;
}

interface Tour {
  id: string;
  title: string;
  rooms: Room[];
}

declare module 'react-three-fiber' {
  export function Canvas(props: any): JSX.Element;
  export function useFrame(callback: (state: any) => void): void;
}