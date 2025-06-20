import formatStylish from '../formatters/stylish.js'

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

  test('корректно форматирует дерево изменений в stylish-формате', () => {
    const result = formatStylish(ast)
    expect(result).toBe(expected)
  })
})
