#!/usr/bin/env node
const rminimist = require('rminimist')
const dargs = require('dargs')
const spawn = require('child_process').spawn
const debug = require('debug')('prettier-eslint_d')
const join = require('path').resolve

/**
 * These are discarded
 */

const UNSUPPORTED = {
  boolean: ['no-bracket-spacing', 'jsx-bracket-same-line', 'use-tabs'],
  string: ['arrow-parens', 'single-quote', 'config-precedence']
}

/**
 * Options for rminimist
 */

const PRETTIER_OPTIONS = {
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

function run () /*: Promise<void> */ {
  const argv /*: Array<string> */ = process.argv.slice(2)
  const flags /*: Flags */ = rminimist(argv, PRETTIER_OPTIONS)

  if (flags.version) {
    console.log(require('../package.json').version)
    process.exit(0)
  } else if (flags.stdin) {
    return spawnPiped({
      prettierArgs: dargs(flags),
      eslintArgs: ['--stdin', '--fix-to-stdout']
    })
  } else {
    require('.bin/prettier-eslint')
    return Promise.resolve()
  }
}

/**
 * Spawns prettier and eslint in a piped fashion (`prettier_d | eslint_d`).
 *
 * @example
 * This is equivalent to doing `prettier_d --stdin | eslint_d --stdin
 * --fix-to-stdout`.
 *
 *     spawnPiped({
 *       prettierArgs: ['--stdin'],
 *       eslintArgs: ['--stdin', '--fix-to-stdout']
 *     })
 */

function spawnPiped ({ prettierArgs, eslintArgs }) /*: Promise<void> */ {
  return new Promise((resolve, reject) => {
    const nodePath /*: string */ = process.argv[0]

    const prettierCmd /*: Array<string> */ = [
      getPrettierPath(),
      ...prettierArgs
    ]
    const eslintCmd /*: Array<string> */ = [getEslintPath(), ...eslintArgs]

    const prettier /*: Process */ = spawn(nodePath, prettierCmd, {
      stdio: [process.stdin, 'pipe', process.stderr]
    })

    const eslint /*: Process */ = spawn(nodePath, eslintCmd, {
      stdio: [prettier.stdout, process.stdout, process.stderr]
    })

    prettier.on('close', (code /*: ?number */, signal /*: string */) => {
      debug('run(): prettier died', { code, signal })
      process.exit(code || 1)
      resolve()
    })

    eslint.on('close', (code /*: ?number */, signal /*: string */) => {
      debug('run(): eslint died', { code, signal })
      if (code !== 0) {
        process.exit(code || 1)
        resolve()
      }
    })
  })
}

function getEslintPath () /*: string */ {
  return require.resolve('.bin/eslint_d')
}

function getPrettierPath () /*: string */ {
  return require.resolve('.bin/prettier_d')
}

function getPrettierEslintPath () /*: string */ {
  return require.resolve('.bin/prettier_d')
}

/*
 * Run
 */

if (!module.parent) {
  run().catch(err => {
    console.error(err.stack)
    process.exit(err.code)
  })
}
