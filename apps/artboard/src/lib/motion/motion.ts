import { type Vector } from "@artboard/vector";
import { type Rectangle } from "@libraries/graphics";

export type EdgeName = keyof Rectangle;

export type Motion = {
  delay: number;
  duration: number;
  to: Vector;
};
