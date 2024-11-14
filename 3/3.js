const fs = require('fs');

const wasmBuffer = fs.readFileSync('3.wasm');

WebAssembly.instantiate(wasmBuffer).then((result) => {
  const { max } = result.instance.exports;

  const resultValue1 = max(5, 7);
  const resultValue2 = max(10, 3);

  console.log('Max of 5 and 7:', resultValue1);
  console.log('Max of 10 and 3:', resultValue2);
}).catch(err => {
  console.error('Error loading WebAssembly module:', err);
});
