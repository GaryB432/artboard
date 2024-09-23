export class LeftHand {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `LeftHand says: hello to ${name}`;
  }
}
