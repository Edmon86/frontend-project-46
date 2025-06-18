import stylish from './stylish.js'
import plain from './plain.js'

const format = (ast, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(ast)
    case 'plain':
      return plain(ast)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
