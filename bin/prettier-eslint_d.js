const minimist = require('rminimist')
const dargs = require('dargs')

const unspported = {
  boolean: [
    'no-bracket-spacing',
    'jsx-bracket-same-line',
    'use-tabs'
  ],

  string: [
    'arrow-parens',
    'single-quote',
    'config-precedence'
  ]
}

const options = {
  boolean: [
    'fallback',
    'json',
    'local-only',
    'no-semi',
    'pkg-conf',
    'require-pragma',
    'single-quote',
    'stdin',
    'support-info',
    'version',
    'with-node-moudles',
    'write',
    'editorconfig'
  ],
  string: [
    'cursor-offset',
    'help',
    'loglevel',
    'parser',
    'print-width',
    'prose-wrap',
    'range-end',
    'range-start',
    'stdin-filepath',
    'config',
    'find-config-path',
    'ignore-path',
    'plugin',
    'with-node-modules'
  ],
  alias: {
    l: 'list-different',
    h: 'help',
    v: 'version'
  }
}

/**
 * Runs.
 */

function run () {
  const argv = process.argv.slice(2)
  const flags = minimist(argv, options)
  const prettierPath = require.resolve('prettier_d/bin/prettier_d.js')
  const eslintPath = require.resolve('eslint_d/bin/eslint_d.js')
  console.log(flags)
  console.log(dargs(flags))
}

/*
 * Run
 */

if (!module.parent) {
  run()
}
