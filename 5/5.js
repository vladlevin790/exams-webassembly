const fs = require('fs');

const wasmBuffer = fs.readFileSync('5.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { factorial } = result.instance.exports;

  const number = 5;
  const resultValue = factorial(number);

  console.log(`Factorial of ${number}:`, resultValue);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
