# @await-to/chainable

## Install

```sh
npm i @await-to/chainable
```

## Example

```ts
import { to, OkResult } from '@await-to/chainable';

const result = await to(Promise.resolve({ test: 123 }))
	.and((result) => {
		if (!result.ok) return result;

		return OkResult(result.data.text);
	})
	// Also supports chaining async functions
	.and(async (result) => {
		if (!result.ok) return result;

		return OkResult(Number(result.data.text));
	})
	.get();

if (result.ok) {
	result.data; // data is number
}
```
