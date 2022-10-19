import { OkResult } from '@await-to/core';
import { describe, it, expect, assert } from 'vitest';

import { to } from '.';

describe('chainable', async () => {
	it('should return a value when resolved', async () => {
		const a = to(Promise.reject(true))
			.and(async (result) => {
				if (result.ok) {
					return OkResult(result.data ? 1 : 2);
				}
				return OkResult(-1);
			})
			.and((result) => {
				if (result.ok) {
					return OkResult(result.data.toString());
				} else {
					return OkResult('error');
				}
			});

		const result = await a.get();

		assert(result.ok);
		expect(result.data).toBe('-1');
	});
});
