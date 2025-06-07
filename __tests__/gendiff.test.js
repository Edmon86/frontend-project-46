import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/genDiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('gendiff flat json', () => {
  const expected = readFile('expected.txt')
  const result = genDiff(
    JSON.parse(readFile('file1.json')),
    JSON.parse(readFile('file2.json')),
  ).trim()

  expect(result).toBe(expected)
})
