const fs = require('fs');

const wasmBuffer = fs.readFileSync('7.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { sum } = result.instance.exports;

  const resultValue = sum(5, 7);

  console.log('Sum:', resultValue);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
