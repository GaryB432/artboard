import { describe, it, expect, beforeEach } from 'vitest';
import { Vector } from './vector';

describe('vector test', () => {
	let sut: Vector;
	beforeEach(() => {
		sut = new Vector(0, 0);
	});
	it('adds 1 + 2 to equal 3', () => {
		const v23 = new Vector(2, 3);
		expect(sut.add(v23).toString()).toEqual('(2,3)');
		expect(sut.clone().add(new Vector(1, 1)).toString()).toEqual('(3,4)');
		expect(sut.clone().sub(new Vector(2, 3)).toString()).toEqual('(0,0)');
		sut.sub(v23);
		expect(sut.toString()).toEqual('(0,0)');
	});
});
