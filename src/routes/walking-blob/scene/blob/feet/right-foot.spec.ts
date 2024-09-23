import { beforeEach, describe, expect, test } from 'vitest';
import { RightFoot } from './right-foot';

describe('RightFoot', () => {
  let rightFoot: RightFoot;
  beforeEach(() => {
    rightFoot = new RightFoot(2);
  });
  test('adds', () => {
    expect(
      rightFoot.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      rightFoot.greet('world')
    ).toEqual(
      'RightFoot says: hello to world'
    );
  });
});
