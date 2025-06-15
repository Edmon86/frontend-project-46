import { fileURLToPath } from 'url'
import path from 'path'
import { test, expect, describe } from '@jest/globals'
import gendiff from '../gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

describe('gendiff flat files (json and yaml)', () => {
  const formats = ['json', 'yml']

  formats.forEach((ext) => {
    test(`gendiff .${ext}`, () => {
      const filepath1 = getFixturePath(`file1.${ext}`)
      const filepath2 = getFixturePath(`file2.${ext}`)
      const result = gendiff(filepath1, filepath2)
      expect(result.trim()).toBe(expected.trim())
    })
  })
})

const expectedNested = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

describe('gendiff nested files (json and yml)', () => {
  const formats = ['json', 'yml']

  formats.forEach((ext) => {
    test(`gendiff nested .${ext}`, () => {
      const filepath1 = getFixturePath(`nested1.${ext}`)
      const filepath2 = getFixturePath(`nested2.${ext}`)
      const result = gendiff(filepath1, filepath2)
      expect(result.trim()).toBe(expectedNested.trim())
    })
  })
})
