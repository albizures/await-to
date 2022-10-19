import { describe, it, expect, assert } from 'vitest';
import { to } from '@await-to/chainable';
import { awaitToZod } from '.';
import { z } from 'zod';

const schema = z
	.object({
		amount: z.string(),
	})
	.transform((current) => {
		return {
			amount: Number(current.amount),
		};
	});

describe('awaitToZod', async () => {
	it('should parse the result data', async () => {
		const input = { amount: '1' };
		const promise = Promise.resolve(input);

		const result = await to(promise).and(awaitToZod(schema)).get();

		assert(result.ok);
		expect(result.data).toEqual({
			amount: 1,
		});
	});
	describe('when the result was failed', () => {
		it('should parse the result data', async () => {
			const promise = Promise.reject(new Error('some error'));

			const result = await to(promise).and(awaitToZod(schema)).get();

			assert(!result.ok);
			assert(result.error instanceof Error);
			expect(result.error.message).toBe('some error');
		});
	});
});
