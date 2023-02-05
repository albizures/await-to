import { FailResult, OkResult } from '@await-to/core';
import { describe, it, expect, assert } from 'vitest';

import { to } from '.';

describe('chainable', async () => {
	it('should return a value when resolved', async () => {
		const promise = to(Promise.reject(true))
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

		const result = await promise.get();

		assert(result.ok);
		expect(result.data).toBe('-1');
	});
	it('should return an error when rejected', async () => {
		const promise = to<boolean, boolean>(Promise.reject(true))
			.and(async (result) => {
				if (result.ok) {
					return OkResult(result.data ? 1 : 2);
				}
				return FailResult(-1);
			})
			.and((result) => {
				if (result.ok) {
					return OkResult(result.data.toString());
				} else {
					return FailResult('error');
				}
			});

		const result = await promise.get();

		console.log(result);

		assert(!result.ok);
		expect(result.error).toBe('error');
	});
});
