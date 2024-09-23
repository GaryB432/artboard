import { beforeEach, describe, expect, test } from 'vitest';
import { RightHand } from './right-hand';

describe('RightHand', () => {
  let rightHand: RightHand;
  beforeEach(() => {
    rightHand = new RightHand(2);
  });
  test('adds', () => {
    expect(
      rightHand.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      rightHand.greet('world')
    ).toEqual(
      'RightHand says: hello to world'
    );
  });
});
