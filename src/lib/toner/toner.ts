export interface TonePart {
  delay: number;
  duration: number;
  frequency: number;
}

export class Toner {
  public async play(tune: TonePart[]): Promise<void> {
    const attack = 0.0005;
    const decay = attack;
    let start = 0;
    const ctx = new AudioContext();
    const g = ctx.createGain();
    g.connect(ctx.destination);
    for (const tone of tune) {
      start += tone.delay;
      const stop = start + tone.duration;
      const o = ctx.createOscillator();
      g.gain.cancelScheduledValues(start);
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(1, start + attack);
      g.gain.linearRampToValueAtTime(0, stop - decay);
      o.frequency.value = tone.frequency;
      o.connect(g);
      o.start(start);
      o.stop(stop);
      start += tone.duration;
    }

    return new Promise<void>((success) => {
      setTimeout(() => {
        success(void 0);
      }, start * 1000);
    });
  }
}
