import { describe, expect, test } from 'vitest';

import { add, greet, meaning } from './housing';

describe('Housing', () => {
  test('adds', () => {
    expect(add(2, 3)).toEqual(5);
  });
  test('greets', () => {
    expect(greet('world')).toEqual('housing says: hello to world');
  });
  test('meaning', () => {
    expect(meaning.life).toEqual(42);
  });
});
