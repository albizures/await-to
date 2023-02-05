import { Result, to as simpleTo } from '@await-to/core';

export type Transform<D1, D2, E1 = unknown, E2 = unknown> = (
	result: Result<D1, E1>,
) => Result<D2, E2> | Promise<Result<D2, E2>>;

export type Chainable<D1, E1 = unknown> = {
	and<D2, E2>(
		transform: Transform<D1, D2, E1, E2>,
	): Chainable<D2, E2>;
	get(): Promise<Result<D1, E1>>;
};

export function to<D, E>(promise: Promise<D>): Chainable<D, E> {
	const transforms: Transform<unknown, unknown, unknown, unknown>[] =
		[];

	function and<D1, D2, E1, E2>(transform: Transform<D1, D2, E1, E2>) {
		transforms.push(
			transform as Transform<unknown, unknown, unknown, unknown>,
		);
		return {
			and,
			get,
		};
	}

	async function get<D, E>() {
		let result: Result<unknown> = await simpleTo(promise);
		for (const transform of transforms) {
			result = await transform(result);

			if (!result.ok) {
				break;
			}
		}

		return result as Result<D, E>;
	}

	return {
		and,
		get,
	};
}

export type { Result };

export { OkResult, FailResult } from '@await-to/core';
