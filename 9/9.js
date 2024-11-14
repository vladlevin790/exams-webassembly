// 1 or 9
const fs = require('fs');

const wasmBuffer = fs.readFileSync('./9.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  const { is_even } = wasmModule.instance.exports;

  console.log("Is 4 even?", is_even(4) === 0 ? "Yes" : "No");
  console.log("Is 7 even?", is_even(7) === 0 ? "Yes" : "No");
});
