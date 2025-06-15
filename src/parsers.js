import yaml from 'js-yaml'

const parse = (content, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(content)
    case 'yaml':
    case 'yml':
      return yaml.load(content)
    default:
      throw new Error(`Unsupported file format: ${ext}`)
  }
}

export default parse
