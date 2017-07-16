
const fs = require('fs')

const industry = require('../data/industry.json')

const output = Object.keys(industry.data).reduce((arr, key) => {
  return arr.concat([{
    issuer_identification_number: industry.data[key],
    name: key,
    iin: industry.data[key].map((i) => {
      return i.replace(/\*+/ig, '')
    }).map((i) => parseInt(i, 10))
  }])
}, [])

console.log(output)

fs.writeFile('data/industry.v2.json', JSON.stringify({
  data: output
}), 'utf-8', (err, ok) => {
  console.log(err, ok)
})
