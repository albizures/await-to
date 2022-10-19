# @await-to/ky

## Install

```sh
npm i @await-to/chainable
npm i @await-to/ky
```

## Example

```ts
import { to, OkResult } from '@await-to/chainable';
import { awaitToKy } from '@await-to/ky';
import { ky } from 'ky';

const result = await to(ky.get('https://example.com').json())
	.and(awaitToKy())
	.get();

if (!result.ok) {
	// if ky resolved with a HTTPError, `awaitToKy` will resolve it
	// first as error.response.json()
	// or as secodnd option as error.response.text()
	result.error;
}
```
