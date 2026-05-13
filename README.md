# ts-result
[![CI][ci-badge]][ci-status]
[![npm version][npm-badge]][npm-link]
[![npm updated][npm-date-badge]][npm-link]

Minimalistic Result type for TypeScript.


## ⚠️ Archived
This project is archived.
I recommend using [better-result](https://github.com/dmmulroy/better-result) instead.


## 📦 Installation
```sh
npm install @serkonda7/ts-result
```


## 🚀 Usage
```ts
import { ok, err, unwrap, type Result } from '@serkonda7/ts-result'

// To use, wrap a functions return type into `Result<>`
function parsePort (input: string): Result<number> {
    const port = Number.parseInt(input, 10)

    if (!Number.isInteger(port)) {
        // Return an error result by using the `err()` helper
        return err('PORT must be an integer')
    }

    if (port < 1 || port > 65535) {
      // It supports strings and Error classes
        return err(new Error('PORT must be between 1 and 65535'))
    }

    // Return an successful result using the `ok()` helper
    return ok(port)
}

const portResult = parsePort(process.env.PORT)

// Check the result for an error:
if (portResult.error) {
    console.error(portResult.error)
    process.exit(1)
}

// Use the value afterwards
let port = portResult.value

// Use the `unwrap()` helper to throw any error or return the value
const port = unwrap(portResult)
```


## 🧹 Linter Configuration
To avoid exception-based control flow, configure your linter to disallow `throw` statements in application code.

### Biome example configuration
```gritql
// no-throw.grit

language js (typescript, jsx);

`throw $expr` as $throw where {
  register_diagnostic(
    span = $throw,
    message = "Use Result 'return err(...)' instead of `throw`"
  )
}
```

```jsonc
// biome.jsonc

{
  // ...
  "plugins": ["./no-throw.grit"]
}
```


## 📜 License
This repo is licensed under the [MIT License](LICENSE.txt).


<!-- links -->
[ci-badge]: https://github.com/serkonda7/ts-result/actions/workflows/ci.yml/badge.svg
[ci-status]: https://github.com/serkonda7/ts-result/actions/workflows/ci.yml
[npm-badge]: https://nodei.co/npm/@serkonda7/ts-result.svg?style=shields&data=v&color=blue
[npm-date-badge]: https://nodei.co/npm/@serkonda7/ts-result.svg?style=shields&data=u,d&color=blue
[npm-link]: https://www.npmjs.com/package/@serkonda7/ts-result
