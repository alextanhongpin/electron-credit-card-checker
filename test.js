
const industry = require('./data/iin.v2.json').data
const iins = industry.map((x) => {
  return x.iin_ranges.map((y) => {
    return y.toString()
  }).sort((a, b) => {
    if (a.length > b.length) {
      return -1
    }
    if (a.length < b.length) {
      return 1
    }
    return 0
  })
})

function checkIin (iin) {
  let n = 0
  const v = iins.some((x, i) => {
    n = i
    return x.some((y) => {
      return iin === y// iin.indexOf(y) === 0
    })
  })

  if (v) {
    return industry[n]
  } else {
    const v = iins.some((x, i) => {
      n = i
      return x.some((y) => {
        return iin.indexOf(y) === 0
      })
    })
    if (v) {
      return industry[n]
    }
    return null
  }
}

module.exports = checkIin
