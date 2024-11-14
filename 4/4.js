const fs = require('fs');

const wasmBuffer = fs.readFileSync('4.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { multiply, divide } = result.instance.exports;

  const multiplyResult = multiply(4.5, 2.0);
  const divideResult = divide(9.0, 3.0);

  console.log('Result of multiplying 4.5 and 2.0:', multiplyResult);
  console.log('Result of dividing 9.0 by 3.0:', divideResult);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
