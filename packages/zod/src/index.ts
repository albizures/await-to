import { OkResult, Result, FailResult } from '@await-to/core';
import { z } from 'zod';

export function awaitToZod<
	S extends z.ZodAny,
	O = z.output<S>,
	I = z.input<S>,
>(schema: z.ZodType<O, any, I>) {
	return <D1, E1>(
		result: Result<D1, E1>,
	): Result<O, z.ZodError<I> | E1> => {
		if (!result.ok) {
			return result;
		}

		const resultParse = schema.safeParse(result.data);

		return resultParse.success
			? OkResult(resultParse.data)
			: FailResult(resultParse.error);
	};
}
