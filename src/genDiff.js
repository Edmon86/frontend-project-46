import _ from 'lodash'

const formatValue = (value) => {
  if (_.isBoolean(value) || _.isNumber(value) || value === null) {
    return String(value)
  }
  return value
}

const genDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  const lines = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${formatValue(data1[key])}`
    }

    if (!_.has(data1, key)) {
      return `  + ${key}: ${formatValue(data2[key])}`
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return [
        `  - ${key}: ${formatValue(data1[key])}`,
        `  + ${key}: ${formatValue(data2[key])}`,
      ]
    }

    return `    ${key}: ${formatValue(data1[key])}`
  })

  return `{\n${lines.flat().join('\n')}\n}`
}

export default genDiff
