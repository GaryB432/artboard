interface TonePart {
  delay: number;
  duration: number;
  frequency: number;
}

export class Toner {
  public play(): void {
    const song: TonePart[] = [
      { delay: 0, duration: 0.2, frequency: 523.25 },
      { delay: 0, duration: 0.2, frequency: 440 },
      { delay: 0, duration: 0.3, frequency: 523.25 },
      { delay: 0, duration: 0.2, frequency: 493.88 },
    ];
    const attack = 0.005;
    const decay = attack;
    let start = 0;
    const ctx = new AudioContext();
    const g = ctx.createGain();
    g.connect(ctx.destination);
    for (const tone of song) {
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
  }
}
