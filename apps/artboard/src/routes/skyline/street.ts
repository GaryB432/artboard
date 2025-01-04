interface Skyline {
  fillStyle: string;
  speed: number;
  storey: number;
  width: number;
  ys: number[];
}

export const layers: Skyline[] = [
  {
    ys: [
      7, 7, 5, 0, 0, 6, 6, 4, 4, 5, 0, 0, 0, 3, 3, 3, 4, 5, 5, 3, 3, 0, 7, 7, 0,
      6, 7, 6, 0, 4, 4, 4, 0, 6, 6, 4, 0,
    ],
    storey: 50,
    speed: 0.0125,
    width: 20,
    fillStyle: "#cd853f",
  },
  {
    ys: [
      0, 4, 4, 0, 5, 5, 3, 4, 0, 0, 2, 4, 4, 4, 0, 4, 0, 3, 3, 0, 2, 2, 2, 3, 0,
      4, 3, 3,
    ],
    storey: 45,
    speed: 0.0375,
    width: 24,
    fillStyle: "#a0522d",
  },
  {
    ys: [2, 2, 0, 3, 4, 2, 0, 5, 5, 0, 0, 2, 2, 3, 3, 3, 3, 0, 2],
    storey: 40,
    speed: 0.05125,
    width: 28,
    fillStyle: "#800000",
  },
];
