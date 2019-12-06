function* generateStpe () {
    let step
    yield step = 'login'
    console.log(step)
    yield step = 'confirmChoose'
    console.log(step)
    yield step = 'pay'
    console.log(step)
    yield step = 'confirmPay'
    console.log(step)
    yield step = 'sale'
    for (;;) {
        console.log(`${yield 'sale'}`)
    }
    // return 'end'
}

const step = generateStpe()

console.log(step.next())
console.log(step.next())
console.log(step.next())
console.log(step.next())
console.log(step.next())
console.log(step.next())
console.log(step.next({}))
console.log(step.next(2323))

function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
  
  for (let n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
  }

//   ww.next()

let c = {
    name: 'payConfirm',
    msg: 'reLogin',
    data: {}
}

if (c.msg === 'reLogin') {
    // pipe()
} else {
    // 
}
