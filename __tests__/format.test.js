import format from '../src/formatters/index.js'

describe('format', () => {
  test('бросает ошибку при неизвестном формате', () => {
    const ast = []
    expect(() => format(ast, 'unknown')).toThrow('Unknown format: unknown')
  })
})
