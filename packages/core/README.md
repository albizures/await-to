# @await-to/core

## Install

```sh
npm i @await-to/core
```

## Example

```ts
import { to } from '@await-to/core';

const result = await to(Promise.resolve({ test: 123 }));

if (result.ok) {
	result.data; // it's safe to access to data
} else {
	// data doesn't exist within `result`
	// instead an error is available
	result.error;
}
```
