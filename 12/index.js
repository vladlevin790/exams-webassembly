const fs = require('fs');
const path = require('path');

// Функция для загрузки WASM модуля
async function loadWasm() {
  const wasmFilePath = path.resolve(__dirname, 'copy_string.wasm');
  const buffer = fs.readFileSync(wasmFilePath);

  const { instance } = await WebAssembly.instantiate(buffer, {
    env: {
      memory: new WebAssembly.Memory({ initial: 1 })
    }
  });

  return instance.exports;
}

// Функция для тестирования копирования строки
async function testCopyString() {
  const wasm = await loadWasm();

  const encoder = new TextEncoder();
  const str = "Hello, WebAssembly!";
  const strBuffer = encoder.encode(str + '\0'); // Добавляем завершающий ноль

  // Создаем область памяти
  const memory = new Uint8Array(wasm.memory.buffer);

  // Устанавливаем исходную строку в память
  memory.set(strBuffer, 0);

  // Задаем указатель для места назначения
  const destPtr = strBuffer.length;

  // Копируем строку
  wasm.copy_string(0, destPtr);

  // Читаем скопированную строку из памяти
  const copiedString = [];
  for (let i = destPtr; memory[i] !== 0; i++) {
    copiedString.push(String.fromCharCode(memory[i]));
  }

  console.log(`Скопированная строка: "${copiedString.join('')}"`);
}

testCopyString().catch(console.error);
