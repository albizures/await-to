import { Transform } from '@await-to/chainable';
import { OkResult, Result, FailResult } from '@await-to/core';
import { ZodType, ZodAny, input, output } from 'zod';

export function awaitToZod<
	S extends ZodAny,
	O = output<S>,
	I = input<S>,
>(schema: ZodType<O, any, I>): Transform<unknown, O> {
	return <D1>(result: Result<D1>) => {
		if (!result.ok) {
			return result;
		}

		const resultParse = schema.safeParse(result.data);

		return resultParse.success
			? OkResult(resultParse.data)
			: FailResult(resultParse.error);
	};
}
