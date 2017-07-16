function sumAsync (x1, x2, cb) {
  if (typeof x1 !== 'number' || typeof x2 !== 'number') {
    return cb(new Error('Can only add numbers'))
  }
  setTimeout(() => {
    return cb(null, x1 + x2)
  }, Math.random() * 1500 + 500)
}

function sumAsyncPromise (x, y) {
  return new Promise((resolve, reject) => {
    sumAsync(x, y, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const loopPromises = Array(10).fill(0).map((_, index) => {
  return sumAsyncPromise(index, index + 1)
})

Promise.all(loopPromises).then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
})

function loopSumAsync (n, cb) {
  let results = []
  for (var i = 0; i < n; i++) {
    (function (i) {
      sumAsync(i, i + 1, (err, result) => {
        if (err) {
          cb(err)
        }
        results.push(result)
        if (results.length === n) {
          cb(null, results)
        }
      })
    })(i)
  }
}

loopSumAsync(10, (err, result) => {
  if (err) {
    throw err
  }
  console.log('got all results', result)
  // Results not sorted
  // [ 9, 17, 5, 15, 19, 1, 13, 11, 7, 3 ]
})
