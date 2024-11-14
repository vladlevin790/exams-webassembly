const fs = require('fs');

const wasmBuffer = fs.readFileSync('10.wasm');

WebAssembly.instantiate(wasmBuffer, {
  env: {
    memory: new WebAssembly.Memory({ initial: 1 })
  }
}).then(({ instance }) => {
  const number = 12;
  const memory = new Uint8Array(instance.exports.memory.buffer);

  const ptr = 0;
  
  instance.exports.to_binary(number, ptr);

  const binaryResult = memory.slice(ptr, ptr + 32)
                              .reverse()
                              .map(b => b === 1 ? '1' : '0')
                              .join('');

  const trimmedBinary = binaryResult.replace(/^0+/, '') || '0';

  console.log(trimmedBinary);
});
