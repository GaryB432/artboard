import { beforeEach, describe, expect, test } from 'vitest';
import { Head } from './head';

describe('Head', () => {
  let head: Head;
  beforeEach(() => {
    head = new Head(2);
  });
  test('adds', () => {
    expect(
      head.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      head.greet('world')
    ).toEqual(
      'Head says: hello to world'
    );
  });
});
