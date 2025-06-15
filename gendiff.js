import fs from 'fs'
import path from 'path'
import parse from './src/parsers.js'
import buildAst from './src/buildAst.js'
import formatStylish from './formatters/stylish.js'

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const ext = path.extname(filepath).slice(1)
  return parse(content, ext)
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const ast = buildAst(data1, data2)

  if (format === 'stylish') {
    return formatStylish(ast)
  }

  throw new Error(`Unknown format: ${format}`)
}

export default gendiff
