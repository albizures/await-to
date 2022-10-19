import { describe, it, expect, assert } from 'vitest';
import { Mutable } from 'utility-types';
import { to } from '@await-to/chainable';
import { HTTPError } from 'ky';

import { awaitToKy } from '.';

interface FakeResponseArgs {
	status: number;
	statusText: string;
	json: boolean;
}

function createFakeResponse(args: FakeResponseArgs): Response {
	const { status, statusText, json = false } = args;
	// Start with a realistic fetch Response.
	const response: Mutable<Response> = { ...new Response() };

	response.status = status;
	response.json = () =>
		json
			? Promise.resolve({ message: 'Some error' })
			: Promise.reject({ message: 'Some error' });
	response.text = () => Promise.resolve('Some error');

	response.statusText = statusText;

	return response as Response;
}

describe('awaitToKy', async () => {
	describe('when the response is a json', () => {
		it('should return a value when resolved', async () => {
			const promise = Promise.reject(
				// @ts-expect-error missing Request
				new HTTPError(
					createFakeResponse({
						status: 500,
						statusText: 'Error',
						json: true,
					}),
				),
			);

			const result = await to(promise).and(awaitToKy()).get();

			assert(!result.ok);
			expect(result.error).toEqual({
				message: 'Some error',
			});
		});
	});
	describe('when the response is a text', () => {
		it('should return a value when resolved', async () => {
			const promise = Promise.reject(
				// @ts-expect-error missing Request
				new HTTPError(
					createFakeResponse({
						status: 500,
						statusText: 'Error',
						json: false,
					}),
				),
			);

			const result = await to(promise).and(awaitToKy()).get();

			assert(!result.ok);
			expect(result.error).toEqual({
				message: 'Some error',
			});
		});
	});
});
