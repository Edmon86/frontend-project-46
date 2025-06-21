import stylish from './stylish.js'
import plain from './plain.js'
import formatJson from './json.js'
const format = (ast, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(ast)
    case 'plain':
      return plain(ast)
    case 'json':
      return formatJson(ast)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
