// __tests__/gendiff.test.js
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { test, expect, describe } from '@jest/globals'
import gendiff from '../src/gendiff.js'
import buildAst from '../src/buildAst.js'
import parse from '../src/parsers.js'
import format from '../src/formatters/index.js'
import formatStylish from '../src/formatters/stylish.js'

// Утилиты
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')
const readJson = filename => JSON.parse(readFile(filename))

// buildAst
test('buildAst basic', () => {
  const data1 = { a: 1, b: { x: 5 } }
  const data2 = { b: { x: 5, y: 6 }, c: 3 }
  const ast = buildAst(data1, data2)
  expect(ast).toEqual([
    { key: 'a', type: 'removed', value: 1 },
    {
      key: 'b', type: 'nested', children: [
        { key: 'x', type: 'unchanged', value: 5 },
        { key: 'y', type: 'added', value: 6 },
      ],
    },
    { key: 'c', type: 'added', value: 3 },
  ])
})

// formatters/index.js
describe('format', () => {
  test('throws error on unknown format', () => {
    const ast = []
    expect(() => format(ast, 'unknown')).toThrow('Unknown format: unknown')
  })
})

// gendiff flat
describe('gendiff flat files (json and yml)', () => {
  const formats = ['json', 'yml']
  const expected = readFile('expected.txt')

  formats.forEach((ext) => {
    test(`gendiff flat .${ext}`, () => {
      const filepath1 = getFixturePath(`file1.${ext}`)
      const filepath2 = getFixturePath(`file2.${ext}`)
      const result = gendiff(filepath1, filepath2)
      expect(result.trim()).toBe(expected.trim())
    })
  })
})

// gendiff nested
describe('gendiff nested files (json and yml)', () => {
  const formats = ['json', 'yml']
  const expectedNested = readFile('expected_nested.txt')

  formats.forEach((ext) => {
    test(`gendiff nested .${ext}`, () => {
      const filepath1 = getFixturePath(`nested1.${ext}`)
      const filepath2 = getFixturePath(`nested2.${ext}`)
      const result = gendiff(filepath1, filepath2)
      expect(result.trim()).toBe(expectedNested.trim())
    })
  })
})

// gendiff json format
test('gendiff json format', () => {
  const result = gendiff(
    getFixturePath('nested1.json'),
    getFixturePath('nested2.json'),
    'json',
  )
  const actual = JSON.parse(result)
  const expected = readJson('expected_json.json')
  expect(actual).toEqual(expected)
})

// plain format
test('gendiff plain format with JSON', () => {
  const expected = readFile('expected_plain.txt')
  const result = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'plain')
  expect(result.trim()).toBe(expected.trim())
})

test('gendiff plain format with YAML', () => {
  const expected = readFile('expected_plain.txt')
  const result = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yml'), 'plain')
  expect(result.trim()).toBe(expected.trim())
})

// formatStylish
describe('formatStylish', () => {
  const ast = [
    { type: 'added', key: 'addedKey', value: 'newValue' },
    { type: 'removed', key: 'removedKey', value: 123 },
    { type: 'unchanged', key: 'sameKey', value: true },
    {
      type: 'changed',
      key: 'modifiedKey',
      oldValue: 'old',
      newValue: 'new',
    },
    {
      type: 'nested',
      key: 'nestedKey',
      children: [
        { type: 'added', key: 'innerKey', value: 'deepValue' },
      ],
    },
  ]

  const expected = `{
  + addedKey: newValue
  - removedKey: 123
    sameKey: true
  - modifiedKey: old
  + modifiedKey: new
    nestedKey: {
      + innerKey: deepValue
    }
}`

  test('formats tree in stylish format', () => {
    const result = formatStylish(ast)
    expect(result).toBe(expected)
  })

  test('throws error on unknown node type', () => {
    const invalidAst = [{ type: 'invalid_type', key: 'key', value: 'value' }]
    expect(() => formatStylish(invalidAst)).toThrow('Unknown node type: invalid_type')
  })
})

// parse
describe('parse', () => {
  const jsonContent = '{"key": "value", "number": 42}'
  const yamlContent = `
key: value
number: 42
`

  test('parses JSON', () => {
    const result = parse(jsonContent, 'json')
    expect(result).toEqual({ key: 'value', number: 42 })
  })

  test('parses YAML', () => {
    const result = parse(yamlContent, 'yml')
    expect(result).toEqual({ key: 'value', number: 42 })
  })

  test('throws error on unsupported format', () => {
    expect(() => parse(jsonContent, 'txt')).toThrow('Unsupported file format: txt')
  })
})
