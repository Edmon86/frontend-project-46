import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect, describe } from '@jest/globals';
import gendiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('gendiff flat files (json and yaml)', () => {
  const formats = ['json', 'yml'];

  formats.forEach((ext) => {
    test(`gendiff .${ext}`, () => {
      const filepath1 = getFixturePath(`file1.${ext}`);
      const filepath2 = getFixturePath(`file2.${ext}`);
      const result = gendiff(filepath1, filepath2);
      expect(result).toBe(expected);
    });
  });
});
