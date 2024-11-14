const fs = require('fs');

const wasmBuffer = fs.readFileSync('6.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { is_even } = result.instance.exports;

  const evenNumber = 4;
  const oddNumber = 7;

  const resultEven = is_even(evenNumber);
  const resultOdd = is_even(oddNumber);

  console.log(`Is ${evenNumber} even?`, resultEven);
  console.log(`Is ${oddNumber} even?`, resultOdd);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
