
const fs = require('fs')

fs.readFile('text.txt', 'utf-8', (err, file) => {
  const lines = file.split('\n')
  const output = lines.map((line) => {
    return line.replace('(', '').replace(')', '').split(/\s([0-9*]+)$/img).filter(x => x.length)
  }).filter((x) => x.length)
  .reduce((obj, x) => {
    if (!obj[x[0]]) {
      obj[x[0]] = []
    }
    obj[x[0]].push(x[1])
    return obj
  }, {})

  fs.writeFile('data/industry.json', JSON.stringify({data: output}), 'utf-8', (err, ok) => {
    console.log('wrote file successfully')
  })
})
