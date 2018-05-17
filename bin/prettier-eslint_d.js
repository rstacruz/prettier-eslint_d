const rminimist = require('rminimist')
const dargs = require('dargs')
const spawn = require('child_process').spawn
const debug = require('debug')('prettier-eslint_d')

const UNSUPPORTED = {
  boolean: ['no-bracket-spacing', 'jsx-bracket-same-line', 'use-tabs'],

  string: ['arrow-parens', 'single-quote', 'config-precedence']
}

/**
 * Options for rminimist
 */

const OPTIONS = {
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

function run() /*: Promise<void> */ {
  return new Promise((resolve, reject) => {
    const argv /*: Array<string> */ = process.argv.slice(2)
    const flags /*: Flags */ = rminimist(argv, OPTIONS)
    const nodePath /*: string */ = process.argv[0]

    const prettierCmd /*: Array<string> */ = [
      getPrettierPath(),
      ...dargs(flags)
    ]
    const eslintCmd /*: Array<string> */ = [
      getEslintPath(),
      '--stdin',
      '--fix-to-stdout',
      ...(flags['_'] || [])
    ]

    debug('run(): spawn prettier', prettierCmd)
    const prettier = spawn(nodePath, prettierCmd, {
      stdio: ['inherit', 'pipe', 'inherit']
    })

    debug('run(): spawn eslint', eslintCmd)
    const eslint = spawn(nodePath, eslintCmd, {
      stdio: ['pipe', 'inherit', 'inherit']
    })
    prettier.on('stdout', (data) => {
      eslint.write(data)
    })

    prettier.on('close', (code, signal) => {
      debug('run(): prettier died', { code, signal })
      process.exit(code)
      resolve()
    })

    eslint.on('close', (code, signal) => {
      debug('run(): eslint died', { code, signal })
      process.exit(code)
      resolve()
    })

    // console.log(flags)
    // console.log(dargs(flags))
    // console.log({ prettierPath })
    // console.log({ eslintPath })
  })
}

function getEslintPath() /*: string */ {
  return require.resolve('eslint_d/bin/eslint_d.js')
}

function getPrettierPath() /*: string */ {
  return require.resolve('prettier_d/bin/prettier_d.js')
}

/*
 * Run
 */

if (!module.parent) {
  run()
    .catch(err => {
      console.error(err.stack)
      process.exit(err.code)
    })


}
