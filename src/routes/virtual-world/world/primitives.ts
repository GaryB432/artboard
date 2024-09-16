import {
  add,
  distance,
  dot,
  magnitude,
  normalize,
  scale,
  subtract,
} from "./math";

export interface PointInfo {
  x: number;
  y: number;
}

export class Point implements PointInfo {
  public constructor(
    public x: number,
    public y: number,
  ) {}

  public equals(point: Point | { x: number; y: number }): boolean {
    return this.x == point.x && this.y == point.y;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    { size = 18, color = "black", outline = false, fill = false } = {},
  ): void {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (fill) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }
}

export class Segment {
  public constructor(
    public p1: Point,
    public p2: Point,
  ) {}

  public length(): number {
    return distance(this.p1, this.p2);
  }

  public directionVector(): Point {
    return normalize(subtract(this.p2, this.p1));
  }

  public equals(seg: Segment): boolean {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  public includes(point: Point): boolean {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  public distanceToPoint(point: Point): number {
    const proj = this.projectPoint(point);
    if (proj.offset > 0 && proj.offset < 1) {
      return distance(point, proj.point);
    }
    const distToP1 = distance(point, this.p1);
    const distToP2 = distance(point, this.p2);
    return Math.min(distToP1, distToP2);
  }

  public projectPoint(point: Point): { point: Point; offset: number } {
    const a = subtract(point, this.p1);
    const b = subtract(this.p2, this.p1);
    const normB = normalize(b);
    const scaler = dot(a, normB);
    const proj = {
      point: add(this.p1, scale(normB, scaler)),
      offset: scaler / magnitude(b),
    };
    return proj;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    {
      width = 2,
      color = "black",
      dash = [],
    }: { width?: number; color?: string; dash?: number[] } = {},
  ): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
