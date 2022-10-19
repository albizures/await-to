<p align="center">
  <h1 align="center">@await-to</h1>
  <p align="center">
    TypeScript-first async error handler interface
  </p>
</p>
<br/>

## Table of contents

- [Introduction](#introduction)
- [Basic usage](#basic-usage)
- [Chainable](#chainable)
- [Transforms](#transforms)
- [Feedback](#feedback)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Introduction

**Await-to** is an opinionated implementation of [Monads](<https://en.wikipedia.org/wiki/Monad_(functional_programming)>) tailored for JavaScript async syntax with a Typescript-first interface.

## Basic usage

### Installation

```sh
npm i @await-to/core    # npm
yarn add @await-to/core # yarn
pnpm add @await-to/core # pnpm
```

### Example

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

## Chainable

### Installation

```sh
npm i @await-to/chainable    # npm
yarn add @await-to/chainable # yarn
pnpm add @await-to/chainable # pnpm
```

### Example

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

## Transforms

Each _chained_ function is called a **transform** function, there are some pre-defined transforms:

### awaitToZod

it will parse and transform (if that's the case) and return the `result`

```ts
import { to, OkResult } from '@await-to/chainable';
import { awaitToZod } from '@await-to/zod';
import { z } from 'zod';

const schema = z
	.object({
		test: z.string(),
	})
	.transform((current) => {
		return Number(current.test);
	});

const result = await to(Promise.resolve({ test: 123 }))
	.and(awaitToZod(schema))
	.get();

if (result.ok) {
	result.data; // data is number
}
```

### awaitToKy

it will handle `HTTPError`s

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

## Feedback

If you have any feedback, please reach out to us at [@albzrs](https://twitter.com/albzrs)

## Acknowledgements

The api of this libray was heavily inspired by [await-to-js](https://github.com/scopsy/await-to-js)

## License

[MIT](https://choosealicense.com/licenses/mit/)
