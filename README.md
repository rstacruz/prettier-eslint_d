# prettier-eslint_d

> Format your JavaScript files with prettier and eslint, fast

[![Status](https://travis-ci.org/rstacruz/prettier-eslint_d.svg?branch=master)](https://travis-ci.org/rstacruz/prettier-eslint_d "See test builds")

prettier-eslint_d allows you to use [Prettier](https://prettier.io) and [Eslint](https://eslint.org) together, and use them fast. It spawns them as daemons, so any subsequent calls will be as fast as possible. Great for integrating into editors like Emacs and Vim!

## Installation

First, add an Eslint config to your project. prettier-eslint_d assumes you have an `.eslintrc` or `.eslintrc.json` in your project.

Install it via yarn or npm:

```bash
yarn add --dev prettier-eslint_d
```

You can then use `prettier-eslint_d` in the same way you may be using prettier:

```bash
# Fix one file
yarn run prettier-eslint_d --write path/to/file.js

# Fix many files
yarn run prettier-eslint_d --write 'scripts/**/*.js'

# Fix via stdin/stdout (great for editors)
cat path/to/script.js | ./node_modules/.bni/prettier-eslint_d --stdin
```

For more options, see `node_modules/.bin/prettier-eslint_d --help`.

## Adding scripts

Your setup may vary, but I recommend having `check` and `fix` commands in a project. You can add these to your `package.json`:

```js
/* package.json */
{
  "scripts": {
    "prettier:check": "prettier-eslint --list-different 'src/**/*.js'",
    "prettier:fix": "prettier-eslint --write 'src/**/*.js'"
  }
}
```

Add `yarn run prettier:check` in your CI script to ensure that files checked in are formatted properly. You can run `yarn run prettier:fix` to fix up all files.

## Spacemacs installation

See: <https://gist.github.com/rstacruz/a2361d000a88e49472c4419116edaccf>

## Also see

This project integrates the following other projects:

- [eslint_d](https://yarn.pm/eslint_d)
- [prettier_d](https://yarn.pm/prettier_d)
- [prettier-eslint](https://yarn.pm/prettier-eslint)
- [prettier-eslint-cli](https://yarn.pm/prettier-eslint-cli)

## Thanks

**prettier-eslint_d** © 2018+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[![](https://img.shields.io/github/followers/rstacruz.svg?style=social&label=@rstacruz)](https://github.com/rstacruz) &nbsp;
[![](https://img.shields.io/twitter/follow/rstacruz.svg?style=social&label=@rstacruz)](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: https://github.com/rstacruz/prettier-eslint_d/contributors
