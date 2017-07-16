
const tests = [
  79927398710, // invalid
  79927398711, // invalid
  79927398712, // invalid
  79927398713, // valid
  79927398714, // invalid
  79927398715, // invalid
  79927398716, // invalid
  79927398717, // invalid
  79927398718, // invalid
  79927398719, // invalid
  4111111111111111, // invalid
  4111111111111112, // invalid
  49927398716, // valid
  49927398717, // invalid
  1234567812345678, // invalid
  1234567812345670, // valid
  4556737586899855 // valiud
]

function luhn (n) {
  const str = n.toString()
  // Last digit is the check digit
  const checkDigit = parseFloat(str.slice(str.length - 1), 10)
  const nonCheckDigits = str.slice(0, str.length - 1)
  const sumOfNonCheckDigits = nonCheckDigits
  .split('')
  .reverse() // Reverse the number
  .map((v, i) => {
      // Multiply the numbers of each each on the right by 2
    if (i % 2 === 0) {
      const mul = parseFloat(v, 10) * 2
      // If the number is more than 9, sum them together or subtract 9
      return mul > 9 ? mul - 9 : mul
    }
    // Return the number on the left
    return parseFloat(v, 10)
  }).reduce((sum, v) => sum + v, 0) // Compute the sum
  const finalSum = checkDigit + sumOfNonCheckDigits
  return finalSum % 10 === 0
}

console.log(tests.map(luhn))

tests.forEach((n) => {
  console.log(n, luhn(n) ? 'is valid' : 'is not valid')
})
