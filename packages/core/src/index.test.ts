import { describe, it, expect, beforeEach, assert } from 'vitest';

import { to } from '.';

describe('maybe await to test', async () => {
	it('should return a value when resolved', async () => {
		const input = 41;
		const promise = Promise.resolve(input);

		const resolved = await to<number>(promise);

		assert(resolved.ok);
		expect(resolved.data).toEqual(input);
	});

	it('should return an error when promise is rejected', async () => {
		const promise = Promise.reject('Error');

		const resolved = await to<number>(promise);

		assert(!resolved.ok);
		expect(resolved.error).toBeDefined();
	});
});
