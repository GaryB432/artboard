import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Graph {
  constructor(
    public points: Point[] = [],
    public segments: Segment[] = [],
  ) {}

  static load(info: {
    points: { x: number; y: number }[];
    segments: { p1: Point; p2: Point }[];
  }): Graph {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map((i) => {
      const s1 = points.find((p) => p.equals(i.p1));
      const s2 = points.find((p) => p.equals(i.p2));
      if (!s1 || !s2) {
        throw new Error("missing segments");
      }
      return new Segment(s1, s2);
    });
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
