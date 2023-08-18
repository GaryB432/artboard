import { Point } from "./point";

export const strokeLine = (
  ctx: CanvasRenderingContext2D,
  a: Point,
  b: Point,
  drawingStyles: Partial<CanvasPathDrawingStyles>
): void => {
  ctx.beginPath();
  ctx.lineWidth = drawingStyles.lineWidth || 1;
  ctx.lineCap = drawingStyles.lineCap || "round";
  a.moveTo(ctx);
  b.lineTo(ctx);
  ctx.stroke();
};

abstract class Hand {
  public abstract readonly magnitude: number;
  public abstract readonly width: number;
  public constructor(
    protected readonly radius: number,
    public value: number = 0
  ) {}
  public draw(ctx: CanvasRenderingContext2D): void {
    strokeLine(ctx, this.tail(), this.head(), {
      lineCap: "round",
      lineWidth: this.width,
    });
  }
  private head(): Point {
    const theta = (this.degrees() * Math.PI) / 180;
    return new Point(
      this.magnitude * Math.cos(theta),
      this.magnitude * Math.sin(theta)
    );
  }
  private tail(): Point {
    return Point.origin;
  }
  protected abstract degrees(): number;
}

export class MilliSecondHand extends Hand {
  public magnitude = 30;
  public width = 1;
  protected degrees(): number {
    return this.value;
  }
}

export class SecondHand extends Hand {
  public magnitude = this.radius * 0.8;
  public width = 1;
  protected degrees(): number {
    return this.value * 6;
  }
}

export class MinuteHand extends Hand {
  public magnitude = this.radius * 0.7;
  public width = 3;
  protected degrees(): number {
    return this.value * 6;
  }
}

export class HourHand extends Hand {
  public magnitude = this.radius * 0.5;
  public width = 5;
  protected degrees(): number {
    return (this.value % 12) * 30;
  }
}
