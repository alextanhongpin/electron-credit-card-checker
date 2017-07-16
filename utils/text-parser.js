
const fs = require('fs')

fs.readFile('data/iin.txt', 'utf-8', (err, file) => {
  const lines = file.split('\n')

  .map((line) => line.split('\t'))

  const header = lines.slice(0, 1)[0]
  const rest = lines.slice(1, lines.length - 1)

  const fields = header.map((x) => x.split(' ').join('_').toLowerCase())

  const output = rest.reduce((arr, n, i) => {
    return arr.concat([
      fields.reduce((obj, m, k) => {
        const v = n[k]
        if (typeof v === 'string') {
          obj[m] = v.replace(/\[(.+)\]/i, '')
        } else {
          obj[m] = n[k]
        }

        return obj
      }, {})
    ])
  }, [])

  const transform = output.map((n) => {
    n.iin_ranges = n.iin_ranges
      .split(',')
      .map(n => {
        const v = n.trim().split('-').map(n => parseFloat(n, 10)).filter(n => !isNaN(n))
        if (v.length > 1) {
          return new Array(v[1] - v[0]).fill(0).map((_, i) => v[0] + i)
        }
        return v
      })
      .reduce((arr, a) => arr.concat(a), [])
      .map((x) => parseFloat(x, 10))
      .filter((x) => !isNaN(x))
    // n['length'] = n['length'].split(',').map(n => n.trim()).map((n) => parseFloat(n, 10))
    n.active = n.active === 'Yes'
    return n
  })
  console.log(transform)

  // fs.writeFile('data/iin.v2.json', JSON.stringify({
  //   data: transform
  // }), 'utf-8', (err, ok) => {
  //   console.log(err, ok)
  // })
})
