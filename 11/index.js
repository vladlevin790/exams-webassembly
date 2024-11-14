const fs = require('fs');
// fs (File System) используется для чтения файла WebAssembly.
const path = require('path');
// path используется для построения пути к файлу независимо от операционной системы.

async function loadWasm() {
  const wasmFilePath = path.resolve(__dirname, 'string_length.wasm');
  //  формирует полный путь, используя текущую директорию __dirname.
  const buffer = fs.readFileSync(wasmFilePath);
//   содержит данные WebAssembly в виде буфера байтов, считанных с помощью fs.readFileSync.

  const { instance } = await WebAssembly.instantiate(buffer, {
    env: {
      memory: new WebAssembly.Memory({ initial: 1 })
    }
    // импортируемая память, доступная внутри WebAssembly-кода:
  });

  return instance.exports;
}

async function testStringLength() {
  const wasm = await loadWasm();

  const encoder = new TextEncoder();
  const str = "Hello";
  const strBuffer = encoder.encode(str + '\0');
//   кодируем строку в utf-8 с которым будет работать wa и добавляем к ней нулевой байт

  const memory = new Uint8Array(wasm.memory.buffer);
//   это представление памяти WebAssembly в виде Uint8Array, что позволяет записывать байты в память.
  memory.set(strBuffer, 0);
//   копирует закодированную строку в начало памяти WebAssembly.

  const length = wasm.string_length(0);
  console.log(`Длина строки "${str}" равна:`, length);
}

testStringLength().catch(console.error);
// Запускается функция testStringLength, а если в процессе возникнет ошибка, она будет выведена в консоль с помощью catch.
