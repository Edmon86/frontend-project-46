import { fileURLToPath } from 'url'
import path from 'path'
import { test, expect, describe } from '@jest/globals'
import fs from 'fs'
import gendiff from '../gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

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
