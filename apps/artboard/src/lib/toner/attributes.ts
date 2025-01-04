// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate

export interface AnimationEventAttributes {
  onbegin: string;
  onend: string;
  onrepeat: string;
}
export interface AnimationTimingAttributes {
  begin: string;
  dur: string;
  end: string;
  fill: "freeze" | "remove";
  max: string;
  min: string;
  repeatCount: string;
  repeatDur: string;
  restart: string;
}
export interface AnimationValueAttributes {
  by: string;
  calcMode: "discrete" | "linear" | "paced" | "spline";
  from: string;
  keySplines: string;
  keyTimes: string;
  to: string;
  values: string;
}
export interface AnimationOtherAttributes {
  accumulate: "none" | "sum";
  additive: "replace" | "sum";
  attributeName: string;
}
