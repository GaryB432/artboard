import { average, getIntersection, getRandomColor } from "../math/utils";
import { Point } from "./point";
import { Segment } from "./segment";

export class Polygon {
  public segments: Segment[] = [];
  public constructor(public points: Point[]) {
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  public static union({ polys }: { polys: Polygon[] }): Segment[] {
    Polygon.multiBreak(polys);
    const keptSegments = [];
    for (let i = 0; i < polys.length; i++) {
      for (const seg of polys[i].segments) {
        let keep = true;
        for (let j = 0; j < polys.length; j++) {
          if (i != j) {
            if (polys[j].containsSegment(seg)) {
              keep = false;
              break;
            }
          }
        }
        if (keep) {
          keptSegments.push(seg);
        }
      }
    }
    return keptSegments;
  }

  public static multiBreak(polys: Polygon[]): void {
    for (let i = 0; i < polys.length - 1; i++) {
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j]);
      }
    }
  }

  public static break(poly1: Polygon, poly2: Polygon): void {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;
    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const int = getIntersection(
          segs1[i].p1,
          segs1[i].p2,
          segs2[j].p1,
          segs2[j].p2,
        );

        if (int && int.offset != 1 && int.offset != 0) {
          const point = new Point(int.x, int.y);
          let aux = segs1[i].p2;
          segs1[i].p2 = point;
          segs1.splice(i + 1, 0, new Segment(point, aux));
          aux = segs2[j].p2;
          segs2[j].p2 = point;
          segs2.splice(j + 1, 0, new Segment(point, aux));
        }
      }
    }
  }

  public distanceToPoint(point: Point): number {
    return Math.min(...this.segments.map((s) => s.distanceToPoint(point)));
  }

  public distanceToPoly(poly: Polygon): number {
    return Math.min(...this.points.map((p) => poly.distanceToPoint(p)));
  }

  public intersectsPoly(poly: Polygon): boolean {
    for (const s1 of this.segments) {
      for (const s2 of poly.segments) {
        if (getIntersection(s1.p1, s1.p2, s2.p1, s2.p2)) {
          return true;
        }
      }
    }
    return false;
  }

  public containsSegment(seg: Segment): boolean {
    const midpoint = average(seg.p1, seg.p2);
    return this.containsPoint(midpoint);
  }

  public containsPoint(point: Point): boolean {
    const outerPoint = new Point(-1000, -1000);
    let intersectionCount = 0;
    for (const seg of this.segments) {
      const int = getIntersection(outerPoint, point, seg.p1, seg.p2);
      if (int) {
        intersectionCount++;
      }
    }
    return intersectionCount % 2 == 1;
  }

  public drawSegments(ctx: CanvasRenderingContext2D): void {
    for (const seg of this.segments) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 });
    }
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    {
      stroke,
      lineWidth,
      fill,
      join,
    }: {
      stroke?: string;
      lineWidth?: number;
      fill?: string;
      join?: CanvasLineJoin;
    },
  ): void {
    ctx.beginPath();
    ctx.fillStyle = fill ?? "rgba(0,0,255,0.3)";
    ctx.strokeStyle = stroke ?? "blue";
    ctx.lineWidth = lineWidth ?? 2;
    ctx.lineJoin = join ?? "miter";
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
