import buildAst from '../src/buildAst.js'

test('buildAst basic', () => {
  const data1 = { a: 1, b: { x: 5 } }
  const data2 = { b: { x: 5, y: 6 }, c: 3 }
  const ast = buildAst(data1, data2)
  expect(ast).toEqual([
    { key: 'a', type: 'removed', value: 1 },
    { key: 'b', type: 'nested', children: [
      { key: 'x', type: 'unchanged', value: 5 },
      { key: 'y', type: 'added', value: 6 },
    ] },
    { key: 'c', type: 'added', value: 3 },
  ])
})
