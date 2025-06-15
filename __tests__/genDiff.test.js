import genDiff from '../src/genDiff.js'

test('genDiff: flat objects', () => {
  const data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }

  const data2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  }

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(genDiff(data1, data2)).toBe(expected)
})
