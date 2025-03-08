import { beforeEach, describe, expect, test } from 'vitest';
import { Center } from './center';

describe('Center', () => {
  let center: Center;

  beforeEach(() => {
    center = new Center(2);
  });
  test('adds', () => {
    expect(
      center.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      center.greet('world')
    ).toEqual(
      'Center says: hello to world'
    );
  });
});
