class BubblesState {
  private _animationSpeed = $state(1);
  private _gravity = $state(9.8);
  private _initialVelocity = $state(200);

  public get animationSpeed(): number {
    return this._animationSpeed;
  }

  public get gravity(): number {
    return this._gravity;
  }

  public get initialVelocity(): number {
    return this._initialVelocity;
  }

  public set animationSpeed(v: number) {
    this._animationSpeed = v;
  }

  public set gravity(v: number) {
    this._gravity = v;
  }

  public set initialVelocity(v: number) {
    this._initialVelocity = v;
  }
}

export const bubblesState = new BubblesState();
