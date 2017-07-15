// Issuer Identification Number

const iin = {
  4: 'Visa',
  51: 'MasterCard',
  52: 'MasterCard',
  53: 'MasterCard',
  54: 'MasterCard',
  55: 'MasterCard',
  36: 'DinersClub',
  38: 'DinersClub',
  65: 'Discover',
  6011: 'Discover',
  35: 'Japan Credit Bureau',
  34: 'American Express',
  37: 'American Express'
}
function checkIIN (n) {
  const first = n.toString()[0]
  const pair = n.toString().slice(0, 2)
  const fourth = n.toString().slice(0, 4)

  if (iin[first]) {
    return iin[first]
  }
  if (iin[pair]) {
    return iin[pair]
  }
  if (iin[fourth]) {
    return iin[fourth]
  }
  return null
}

console.log(checkIIN('12313'))
