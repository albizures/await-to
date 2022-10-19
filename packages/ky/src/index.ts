import { Transform } from '@await-to/chainable';
import { Result, FailResult, to } from '@await-to/core';
import { HTTPError } from 'ky';

export function awaitToKy(): Transform<unknown, unknown> {
	return async <D1>(result: Result<D1>) => {
		if (result.ok) {
			return result;
		}

		if (result.error instanceof HTTPError) {
			// first let's try with json
			// second and then let's try with text
			// at last if nothing works let's return the original error

			let resultError = await to(result.error.response.json());

			if (resultError.ok) {
				return FailResult(resultError.data);
			}

			resultError = await to(result.error.response.text());

			if (resultError.ok) {
				return FailResult({
					message: resultError.data,
				});
			}

			return result;
		} else {
			return result;
		}
	};
}
