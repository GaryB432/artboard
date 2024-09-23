import { beforeEach, describe, expect, test } from 'vitest';
import { Foot } from './foot';

describe('Foot', () => {
  let foot: Foot;
  beforeEach(() => {
    foot = new Foot(2);
  });
  test('adds', () => {
    expect(
      foot.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      foot.greet('world')
    ).toEqual(
      'Foot says: hello to world'
    );
  });
});
