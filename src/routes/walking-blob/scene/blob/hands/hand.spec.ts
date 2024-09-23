import { beforeEach, describe, expect, test } from 'vitest';
import { Hand } from './hand';

describe('Hand', () => {
  let hand: Hand;
  beforeEach(() => {
    hand = new Hand(2);
  });
  test('adds', () => {
    expect(
      hand.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      hand.greet('world')
    ).toEqual(
      'Hand says: hello to world'
    );
  });
});
