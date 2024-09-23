import { beforeEach, describe, expect, test } from 'vitest';
import { Body } from './body';

describe('Body', () => {
  let body: Body;
  beforeEach(() => {
    body = new Body(2);
  });
  test('adds', () => {
    expect(
      body.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      body.greet('world')
    ).toEqual(
      'Body says: hello to world'
    );
  });
});
