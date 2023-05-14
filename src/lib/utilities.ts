import type { Vector } from "./Vector";

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function lerp(start: number, end: number, amount: number): number {
  const tot = end - start;
  const dx = tot * amount;
  return start + dx;
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function vectorMin(v: Vector): number {
  return Math.min(v.x, v.y);
}

export function ranger(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
