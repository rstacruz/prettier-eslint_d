#!/usr/bin/env sh
diff -u \
  bin/prettier-eslint_d.js \
  <(cat bin/prettier-eslint_d.js | node bin/prettier-eslint_d.js --stdin)
