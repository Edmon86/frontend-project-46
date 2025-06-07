#!/usr/bin/env node

import { Command } from 'commander'
import parse from './src/parsers.js'
import genDiff from './src/genDiff.js'

const program = new Command()

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parse(filepath1)
    const data2 = parse(filepath2)

    const diff = genDiff(data1, data2)
    console.log(diff)

    // console.log('File 1 parsed:\n', JSON.stringify(data1, null, 2));
    // console.log('File 2 parsed:\n', JSON.stringify(data2, null, 2));

  })

program.parse(process.argv)
