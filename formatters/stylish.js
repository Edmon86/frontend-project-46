import _ from 'lodash'

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth - 1) * spacesCount)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${getBracketIndent(depth + 1)}}`].join('\n')
}

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const indent = getIndent(depth)
    const bracketIndent = getBracketIndent(depth)

    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n')
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n')
}

export default formatStylish
