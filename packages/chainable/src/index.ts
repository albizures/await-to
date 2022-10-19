import { Result, to as simpleTo } from '@await-to/core';

export type Transform<D1, D2> = (
	result: Result<D1>,
) => Result<D2> | Promise<Result<D2>>;

export type Chainable<D1, T = Result<D1>> = {
	and<D2>(transform: Transform<D1, D2>): Chainable<D2>;
	get(): Promise<T>;
};

export function to<D>(promise: Promise<D>): Chainable<D> {
	const transforms: Transform<unknown, unknown>[] = [];

	function and<D1, D2>(transform: Transform<D1, D2>) {
		transforms.push(transform as Transform<unknown, unknown>);
		return {
			and,
			get,
		};
	}

	async function get<T>() {
		let result: Result<unknown> = await simpleTo(promise);
		for (const transfor of transforms) {
			result = await transfor(result);
		}

		return result as Result<T>;
	}

	return {
		and,
		get,
	};
}

export type { Result };

export { OkResult, FailResult } from '@await-to/core';
