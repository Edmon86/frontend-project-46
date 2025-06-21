import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readJson = (filename) => JSON.parse(readFileSync(getFixturePath(filename), 'utf-8'));

test('gendiff json format', () => {
  const result = gendiff(
    getFixturePath('nested1.json'),
    getFixturePath('nested2.json'),
    'json'
  );
  const actual = JSON.parse(result);
  const expected = readJson('expected_json.json');
  expect(actual).toEqual(expected);
});
