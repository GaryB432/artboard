import { beforeEach, describe, expect, test } from 'vitest';
import { Scatter } from './scatter';

describe('Scatter', () => {
  let scatter: Scatter;

  beforeEach(() => {
    scatter = new Scatter(2);
  });
  test('adds', () => {
    expect(
      scatter.add(3)
    ).toEqual(5);
  });
  test('greets', () => {
    expect(
      scatter.greet('world')
    ).toEqual(
      'Scatter says: hello to world'
    );
  });
});
