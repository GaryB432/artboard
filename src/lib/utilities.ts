import { Vector2 } from "three";

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

export function vectorMin(v: Vector2): number {
  return Math.min(v.x, v.y);
}

/**
 * Fit a container to a containing element by aspect ratio
 * @param container the size of the eontainer
 * @param aspect The aspect ratio to fit
 * @returns a new Vector for the sized element
 */
export function fitToAspectRatio(container: Vector2, aspect: Vector2): Vector2 {
  const margin = 0.9;
  let x = container.x * margin;
  let y = (x / aspect.x) * aspect.y;
  if (y > container.y * margin) {
    y = container.y * margin;
    x = (y / aspect.y) * aspect.x;
  }
  return new Vector2(x, y);
}

/**
 * Return a pseudo-random number in a range
 * @param min minimum value
 * @param max maximum value
 * @returns a pseudo-random number between min and max
 */
export function ranger(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
