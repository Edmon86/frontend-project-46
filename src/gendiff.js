import fs from 'fs'
import path from 'path'
import parse from './parsers.js'
import buildAst from './buildAst.js'
import format from './formatters/index.js' // используем универсальный форматер

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const ext = path.extname(filepath).slice(1)
  return parse(content, ext)
}

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const ast = buildAst(data1, data2)
  return format(ast, formatName) // универсальный вызов форматера
}

export default gendiff
