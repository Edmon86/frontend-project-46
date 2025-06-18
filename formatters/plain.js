const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const plain = (ast) => {
  const iter = (tree, parentPath) => {
    return tree
      .flatMap((node) => {
        const path = parentPath ? `${parentPath}.${node.key}` : node.key

        switch (node.type) {
          case 'added':
            return `Property '${path}' was added with value: ${formatValue(node.value)}`
          case 'removed':
            return `Property '${path}' was removed`
          case 'changed':
            return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
          case 'nested':
            return iter(node.children, path)
          default:
            return []
        }
      })
      .join('\n')
  }

  return iter(ast, '')
}

export default plain
