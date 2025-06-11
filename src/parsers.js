import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFormat = (filepath) => path.extname(filepath).slice(1)

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const parse = (filepath) => {
  const format = getFormat(filepath)
  const content = readFile(filepath)

  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yml':
    case 'yaml':
      return yaml.load(content) // Возвращает JS-объект
    default:
      throw new Error(`Unsupported file format: ${format}`)
  }
}

export default parse
