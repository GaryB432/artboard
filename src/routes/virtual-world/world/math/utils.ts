import type { Point } from "../primitives/point";

export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function normalize(p: Point): Point {
  return p.clone().norm();
}

export function subtract(p1: Point, p2: Point): Point {
  return p1.clone().sub(p2);
}

export function scale(p: Point, scaler: number): Point {
  return new Point(p.x * scaler, p.y * scaler);
}

export function dot(p1: Point, p2: Point): number {
  return p1.x * p2.x + p1.y * p2.y;
}

export function add(p1: Point, arg1: Point) {
  return p1.clone().add(arg1);
}

export function magnitude(p: Point): number {
  return Math.hypot(p.x, p.y);
}
