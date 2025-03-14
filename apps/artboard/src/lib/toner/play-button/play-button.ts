import type {
  AnimationOtherAttributes,
  AnimationTimingAttributes,
  AnimationValueAttributes,
} from "../attributes";

type AnimateAttributes = AnimationValueAttributes &
  AnimationTimingAttributes &
  AnimationOtherAttributes;

interface GSVGAnimateElement extends SVGAnimateElement {
  beginElement(): void;
  beginElementAt(offset: number): void;
  endElement(): void;
  endElementAt(offset: number): void;
}

class Subject<T> {
  private observers: ((value: T) => void)[] = [];

  public subscribe(observer: (value: T) => void): void {
    this.observers.push(observer);
  }

  public next(value: T): void {
    this.observers.forEach((observer) => observer(value));
  }
}

export const svgPaths = {
  pause: "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
  play: "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
};

export type PlayButtonState = "playing" | "paused";

const template = document.createElement("template");
template.innerHTML = `<style>
  :host {
    display: inline-block;
    cursor: default;
  }
  button {
    margin: 0;
    padding: 0;
  }
  svg {
    display: block;
    height: 36px;
    width: 36px;
  }
  </style>
  <button>
  <svg viewbox="0 0 36 36">
    <path>
      <animate></animate>
    </path>
  </svg>
  </button>`;

export class PlayButton extends HTMLElement {
  public changed$: Subject<PlayButtonState> = new Subject();
  private animateElement: GSVGAnimateElement | null;

  public constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.animateElement = shadowRoot.querySelector("animate");

    shadowRoot.addEventListener("click", () => {
      this.state = this.state === "playing" ? "paused" : "playing";
    });
  }

  public static get observedAttributes(): string[] {
    return ["state"];
  }

  public get state(): PlayButtonState {
    const value = this.getAttribute("state") as PlayButtonState;
    return value === null ? "paused" : value;
  }

  public set state(value: PlayButtonState) {
    this.setAttribute("state", value);
  }

  public attributeChangedCallback(name: string): void {
    if (name === "state") {
      if (this.animateElement) {
        const trx = this.getTransition(this.state);
        let k: keyof AnimateAttributes;
        for (k in trx) {
          const v = trx[k];
          if (v) {
            this.animateElement.setAttributeNS(null, k, v);
          }
        }
        this.animateElement.beginElement();
      }
      this.changed$.next(this.state);
    }
  }

  public getTransition(newState: PlayButtonState): Partial<AnimateAttributes> {
    const basics: Partial<AnimateAttributes> = {
      calcMode: "spline",
      begin: "indefinite",
      attributeName: "d",
      fill: "freeze",
      dur: "0.1s",
      keySplines: ".4 0 1 1",
      repeatCount: "1",
    };

    const playing = newState === "playing";
    return {
      ...basics,
      from: playing ? svgPaths.pause : svgPaths.play,
      to: playing ? svgPaths.play : svgPaths.pause,
    };
  }
}
