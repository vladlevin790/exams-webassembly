const fs = require('fs');

const wasmBuffer = fs.readFileSync('2.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { getNumber } = result.instance.exports;

  const number = getNumber();
  console.log('Number from WebAssembly:', number);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
