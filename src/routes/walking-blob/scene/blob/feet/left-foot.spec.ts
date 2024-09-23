import { beforeEach, describe, expect, test } from 'vitest';
import { LeftFoot } from './left-foot';

describe('LeftFoot', () => {
  let leftFoot: LeftFoot;
  beforeEach(() => {
    leftFoot = new LeftFoot(2);
  });
  test('adds', () => {
    expect(
      leftFoot.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      leftFoot.greet('world')
    ).toEqual(
      'LeftFoot says: hello to world'
    );
  });
});
