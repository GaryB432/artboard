const transformScalePointSix: Keyframe = { transform: "scale(.6)" };
const transformScaleOne: Keyframe = { transform: "scale(1)" };
const transformTranslateYZero: Keyframe = { transform: "translateY(0)" };
const transformTranslateYOne: Keyframe = { transform: "translateY(1rem)" };

const transformScaleOneToPointSix = [transformScaleOne, transformScalePointSix];

const alt350: KeyframeAnimationOptions = {
  duration: 350,
  iterations: Infinity,
  direction: "alternate",
};
const alt700: KeyframeAnimationOptions = {
  duration: 700,
  iterations: Infinity,
  direction: "alternate",
};

export function leftFootOptions(): KeyframeAnimationOptions {
  return {
    ...alt700,
    delay: 0,
  };
}
export function leftFootKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return transformScaleOneToPointSix;
}

export function headOptions(): KeyframeAnimationOptions {
  return {
    ...alt350,
    delay: 105,
  };
}
export function headKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return [transformTranslateYZero, transformTranslateYOne];
}

export function bodyOptions(): KeyframeAnimationOptions {
  return {
    ...alt350,
    delay: 15,
  };
}
export function bodyKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return [transformTranslateYZero, transformTranslateYOne];
}

export function leftHandOptions(): KeyframeAnimationOptions {
  return {
    ...alt700,
    delay: 0,
  };
}
export function leftHandKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return transformScaleOneToPointSix.toReversed();
}

export function rightHandOptions(): KeyframeAnimationOptions {
  return {
    ...alt700,
    delay: 0,
  };
}
export function rightHandKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return transformScaleOneToPointSix;
}

export function rightFootOptions(): KeyframeAnimationOptions {
  return {
    ...alt700,
    delay: 0,
  };
}
export function rightFootKeyframes(): Keyframe[] | PropertyIndexedKeyframes {
  return transformScaleOneToPointSix.toReversed();
}
