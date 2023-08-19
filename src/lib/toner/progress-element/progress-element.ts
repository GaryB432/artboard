/* eslint @typescript-eslint/member-ordering: 0 */
const template = document.createElement("template");
template.innerHTML = `<style>
  :host {
    display: inline-block;
  }
  div {
    position: relative;
    display: flex;
    box-shadow: 0 0 0 2px #fff, 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
    width: 50vw;
  }
  .note {
    position: absolute;
    color: initial;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .bars {
    display: flex;
    width: 100%;
  }
  .bars section:after {
    content: '.';
    visibility: hidden;
  }
  .bars section:nth-child(1) {
    background-color: silver;
  }
  .bars section:nth-child(2) {
    background-color: antiquewhite;
  }
  </style>
  <div>
    <section class="note">wtf content</section>
    <section class="bars">
      <section style="width: 40%"></section>
      <section style="width: 60%"></section>
    </section>
  </div>`;

export class ProgressElement extends HTMLElement {
  private noteElement: Element | null;
  private bars: NodeListOf<HTMLDivElement>;

  public static get observedAttributes(): string[] {
    return ["value", "min", "max"];
  }

  public constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.noteElement = shadowRoot.querySelector("div section.note");
    this.bars = shadowRoot.querySelectorAll("div section.bars section");
  }
  public get value(): string {
    return this.getAttribute("value") || "0";
  }

  public set value(value: string) {
    this.setAttribute("value", value);
  }

  public get valueAsNumber(): number {
    return parseInt(this.value);
  }

  public set valueAsNumber(value: number) {
    this.value = value.toString();
  }

  public get min(): number {
    return parseFloat(this.getAttribute("min") || "0");
  }

  public set min(v: number) {
    this.setAttribute("min", v.toString());
  }

  public get max(): number {
    const v = parseFloat(this.getAttribute("max") || "0");
    if (v < 1) {
      throw new RangeError("max is zero");
    }
    return v;
  }

  public set max(v: number) {
    this.setAttribute("max", v.toString());
  }

  public attributeChangedCallback(
    name: "min" | "max" | "value",
    _oldValue: string,
    newValue: string
  ): void {
    switch (name) {
      case "value": {
        if (this.noteElement) {
          this.noteElement.textContent = newValue;
        }
        const widths = this.getBarWidths();
        this.bars.forEach((bar, i) => {
          bar.style.width = `${widths[i] * 100}%`;
        });
        break;
      }
    }
  }

  public getBarWidths(): number[] {
    const used = this.valueAsNumber / this.max;
    return [1 - used, used];
  }
}
