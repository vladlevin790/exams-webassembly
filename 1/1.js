// 1 or 9
const fs = require('fs');

const wasmBuffer = fs.readFileSync('1.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { add } = result.instance.exports;

  const resultValue = add(5, 7);
  console.log('Result of adding 5 and 7:', resultValue);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
