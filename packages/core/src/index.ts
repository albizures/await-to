import { FailResult, OkResult, Result } from './result';

export async function to<D>(promise: Promise<D>): Promise<Result<D>> {
	try {
		const data = await promise;

		return OkResult(data);
	} catch (error) {
		return FailResult(error);
	}
}

export * from './result';
export type To = typeof to;
