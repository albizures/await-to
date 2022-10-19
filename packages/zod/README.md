# @await-to/zod

## Install

```sh
npm i @await-to/chainable
npm i @await-to/zod
```

## Example

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
