export type OkResult<D> = {
	ok: true;
	data: D;
};
export type FailResult<E = unknown> = {
	ok: false;
	error: E;
};
export type Result<D, E = unknown> = OkResult<D> | FailResult<E>;

export function OkResult<D>(data: D): OkResult<D> {
	return {
		ok: true,
		data,
	};
}

export function FailResult<E>(error: E): FailResult<E> {
	return {
		ok: false,
		error,
	};
}
