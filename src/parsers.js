import fs from 'fs'
import path from 'path'

// Получаем расширение файла (json, yaml и т.д.)
const getFormat = (filepath) => path.extname(filepath).slice(1)

// Чтение файла по абсолютному пути
const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath) // Работает и с относительными, и с абсолютными путями
  return fs.readFileSync(fullPath, 'utf-8')
}

// Основная функция парсинга
const parse = (filepath) => {
  const format = getFormat(filepath)
  const content = readFile(filepath)

  if (format === 'json') {
    return JSON.parse(content)
  }

  throw new Error(`Unsupported file format: ${format}`)
}

export default parse
