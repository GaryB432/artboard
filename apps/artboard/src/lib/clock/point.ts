export class Point {
  public static readonly origin = new Point(0, 0);
  public constructor(
    public x: number,
    public y: number,
  ) {}
  public lineTo(ctx: CanvasRenderingContext2D): void {
    ctx.lineTo(this.x, this.y);
  }
  public moveTo(ctx: CanvasRenderingContext2D): void {
    ctx.moveTo(this.x, this.y);
  }
}
