const fs = require('fs');

const wasmBuffer = fs.readFileSync('./8.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  const { add, sub, mul, div } = wasmModule.instance.exports;

  console.log("Add: 5 + 3 =", add(5, 3));
  console.log("Sub: 5 - 3 =", sub(5, 3));
  console.log("Mul: 5 * 3 =", mul(5, 3));
  console.log("Div: 6 / 3 =", div(6, 3));
});
