import { Point, Segment } from "./primitives";

export class Graph {
  constructor(public points: Point[] = [], public segments: Segment[] = []) {}

  static load(info: {
    points: { x: number; y: number }[];
    segments: { p1: Point; p2: Point }[];
  }): Graph {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1))!,
          points.find((p) => p.equals(i.p2))!
        )
    );
    return new Graph(points, segments);
  }

  hash(): string {
    return JSON.stringify(this);
  }

  addPoint(point: Point): void {
    this.points.push(point);
  }

  containsPoint(point: Point): Point | undefined {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point: Point): boolean {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  removePoint(point: Point): void {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  addSegment(seg: Segment): void {
    this.segments.push(seg);
  }

  containsSegment(seg: Segment): Segment | undefined {
    return this.segments.find((s) => s.equals(seg));
  }

  tryAddSegment(seg: Segment): boolean {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removeSegment(seg: Segment): void {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(point: Point): Segment[] {
    const segs: Segment[] = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose(): void {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export function getNearestPoint(
  loc: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER
): Point | null {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }
  return nearest;
}

export function getNearestSegment(
  loc: Point,
  segments: Segment[],
  threshold = Number.MAX_SAFE_INTEGER
): Segment | null {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const seg of segments) {
    const dist = seg.distanceToPoint(loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = seg;
    }
  }
  return nearest;
}

export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function average(p1: Point, p2: Point): Point {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

export function dot(p1: Point, p2: Point): number {
  return p1.x * p2.x + p1.y * p2.y;
}

export function add(p1: Point, p2: Point): Point {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}

export function subtract(p1: Point, p2: Point): Point {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}

export function scale(p: Point, scaler: number): Point {
  return new Point(p.x * scaler, p.y * scaler);
}

export function normalize(p: Point): Point {
  return scale(p, 1 / magnitude(p));
}

export function magnitude(p: Point): number {
  return Math.hypot(p.x, p.y);
}

export function perpendicular(p: Point): Point {
  return new Point(-p.y, p.x);
}

export function translate(loc: Point, angle: number, offset: number): Point {
  return new Point(
    loc.x + Math.cos(angle) * offset,
    loc.y + Math.sin(angle) * offset
  );
}

export function angle(p: Point): number {
  return Math.atan2(p.y, p.x);
}

export function getIntersection(
  A: Point,
  B: Point,
  C: Point,
  D: Point
): { x: number; y: number; offset: number } | null {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  const eps = 0.001;
  if (Math.abs(bottom) > eps) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }

  return null;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerp2D(A: Point, B: Point, t: number): Point {
  return new Point(lerp(A.x, B.x, t), lerp(A.y, B.y, t));
}

// function invLerp(a: number, b: number, v: number) {
//   return (v - a) / (b - a);
// }

// function degToRad(degree: number): number {
//   return (degree * Math.PI) / 180;
// }

export function getRandomColor(): string {
  const hue = 290 + Math.random() * 260;
  return "hsl(" + hue + ", 100%, 60%)";
}

export function getFake3dPoint(
  point: Point,
  viewPoint: Point,
  height: number
): Point {
  const dir = normalize(subtract(point, viewPoint));
  const dist = distance(point, viewPoint);
  const scaler = Math.atan(dist / 300) / (Math.PI / 2);
  return add(point, scale(dir, height * scaler));
}

