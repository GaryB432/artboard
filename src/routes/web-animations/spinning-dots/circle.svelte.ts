export class Circle {
  public element: HTMLElement | null = $state(null);
  public constructor(
    private layer: number,
    private fraction: number,
  ) {}

  public animate(): Animation | undefined {
    if (this.element) {
      const rotate = "rotate(" + 360 * this.fraction + "deg)";
      const translate = "translate(" + (this.layer * 20 - 2.5) + "px)";
      this.element.style.transform = rotate + " " + translate;
      this.element.animate(
        [
          { transform: rotate + " rotate(0deg) " + translate },
          { transform: rotate + " rotate(360deg) " + translate },
        ],
        {
          duration: 1000 * this.layer,
          iterations: Infinity,
        },
      );
    }
    // document.body.appendChild(element);
    return undefined;
  }
}
