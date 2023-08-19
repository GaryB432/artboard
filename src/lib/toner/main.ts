// TODO raze rxjs
import { EMPTY, interval } from "rxjs";
import {
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
// import '../styles/app.scss';
import { PlayButton, type PlayButtonState } from "./play-button/play-button";
import { ProgressElement } from "./progress-element/progress-element";
import { Toner } from "./app/toner";
// import './app.element.scss';

// export class AppElement extends HTMLElement {
//   public static observedAttributes = [];

//   connectedCallback() {
//     const title = 'web';
//     this.innerHTML = `<h1>${title}</h1>`

//   }
// }
// customElements.define('ocelot-root', AppElement);

window.customElements.define("progress-element", ProgressElement);
window.customElements.define("play-button", PlayButton);

const playButton = document.querySelector<PlayButton>("play-button");
const meter = document.querySelector<ProgressElement>("progress-element");

if (!playButton || !meter) {
  throw new Error("missing");
}

const waitSeconds = meter.max;

const toner = new Toner();

const source$ = interval(1000);

meter.valueAsNumber = meter.max;

const pause$ = playButton.changed$.pipe(
  map<PlayButtonState, boolean>((state) => state === "paused"),
  tap((paused) => {
    if (paused) {
      meter.valueAsNumber = meter.max;
    }
  }),
  distinctUntilChanged()
);

const result$ = pause$.pipe(
  switchMap((value) => (value ? EMPTY : source$)),
  take(10000)
);

result$.subscribe({
  next: (time) => {
    // console.log(time, 'result');
    const zup = time % waitSeconds;
    if (zup === 0) {
      toner.play();
    }
    meter.valueAsNumber = waitSeconds - zup;
  },
  complete: () => {
    console.log("come back and restart when you are ready");
  },
});

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js');
//   });
// }
