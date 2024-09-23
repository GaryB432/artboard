import { beforeEach, describe, expect, test } from 'vitest';
import { LeftHand } from './left-hand';

describe('LeftHand', () => {
  let leftHand: LeftHand;
  beforeEach(() => {
    leftHand = new LeftHand(2);
  });
  test('adds', () => {
    expect(
      leftHand.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      leftHand.greet('world')
    ).toEqual(
      'LeftHand says: hello to world'
    );
  });
});
