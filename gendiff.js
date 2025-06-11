import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import genDiff from './src/genDiff.js'

const parse = (content, ext) => {
  if (ext === 'json') return JSON.parse(content)
  if (ext === 'yml' || ext === 'yaml') return yaml.load(content)
  throw new Error(`Unsupported format: ${ext}`)
}

const gendiff = (filepath1, filepath2) => {
  const readFile = (filepath) => {
    const ext = path.extname(filepath).slice(1)
    const content = fs.readFileSync(filepath, 'utf-8')
    return parse(content, ext)
  }

  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  return genDiff(data1, data2)
}

export default gendiff
