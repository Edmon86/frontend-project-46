import parse from '../src/parsers.js';

const jsonContent = '{"key": "value", "number": 42}';
const yamlContent = `
key: value
number: 42
`;

describe('parse', () => {
  test('парсит JSON', () => {
    const result = parse(jsonContent, 'json');
    expect(result).toEqual({ key: 'value', number: 42 });
  });

  test('парсит YAML', () => {
    const result = parse(yamlContent, 'yml');
    expect(result).toEqual({ key: 'value', number: 42 });
  });

  test('бросает ошибку при неподдерживаемом формате', () => {
    expect(() => parse(jsonContent, 'txt')).toThrow('Unsupported file format: txt');
  });
});
