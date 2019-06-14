function makeChangeR(coinsArr, money, currentCoinIndex, map) {
  // no more money to make change out of
  if(money === 0) {
     print(map, coinsArr, currentCoinIndex - 1)
    return 1
  }
  // no more coins to make change out of
  if(currentCoinIndex >= coinsArr.length) return 0;

  // we tried to process a coin with too high of a value
  if(money < 0) return 0;

  // total: running total of the coin values we processed so far
  let total = 0

  // count: running total of combinations we have found so far
  let count = 0

  while(total <= money) {
    let remaining = money - total;
    count += makeChangeR(coinsArr, remaining, currentCoinIndex + 1, map)
    total += coinsArr[currentCoinIndex]
    if(total <= money) {
      countCoins(map, coinsArr[currentCoinIndex])
    }
  }

  return count
}

function makeChange(money) {
  printHeader(['Quarter', 'Dime', 'Nickel', 'Penny'])
  const ways = makeChangeR([25,10,5,1], money, 0, new Map())
  console.log('Count: ', ways)
}

function print(map, coinsArr, coinIndex) {
  let str = ''
  coinsArr.forEach((coin, index) => {
    // if map does not contain the coin being processed as a key, add it to the map with value of 0
    if(!map.has(coin)) {
      map.set(coin, 0)
    }
    str += map.get(coin) + '\t'

    // reset only at the point where we broke off to recurse
    if(index >= coinIndex) {
      map.set(coin, 0)
    }
  })
  console.log(str)
}

function countCoins(map, coin) {
  // if coin exists in the map as a key, get the value and increment by 1
  // else, create entry in the map with value of 1 (the coin we are currently processing)
  if(map.has(coin)) {
    map.set(coin, map.get(coin) + 1)
  } else {
    map.set(coin, 1)
  }
}

function printHeader(denominations) {
  let header = ''
  denominations.forEach(key => {
    header += (key + ' ')
  })
  console.log(header, '\n', '------------------------------')
}

 function makeChangeDynamic(str) {
   const arr = str.split(',')
   const money = parseFloat(arr[arr.length - 1])
   const denominationMap = createDenominationMap(arr, money)
   printHeader(Array.from(denominationMap.keys()))
   const ways = makeChangeR(Array.from(denominationMap.values()), money, 0, new Map())
    console.log('Count: ', ways)
 }

function createDenominationMap(arr, money) {
  const map = new Map()
  for(let i = 0; i < arr.length; i += 2) {
       map.set(arr[i], money / parseFloat(arr[i + 1]))
  }
  return map
}

// invoke make change methods
makeChange(100)
makeChangeDynamic('Coin,1.5,Arrowhead,3,Button,150') 
