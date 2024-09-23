export class RightHand {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `RightHand says: hello to ${name}`;
  }
}
