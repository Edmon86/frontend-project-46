import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import gendiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

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
