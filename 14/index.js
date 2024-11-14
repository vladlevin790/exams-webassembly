const fs = require('fs');
const path = require('path');

// Функция для загрузки WebAssembly модуля
async function loadWasm(file) {
  const filePath = path.resolve(__dirname, file); // Получаем абсолютный путь к файлу
  const buffer = fs.readFileSync(filePath); // Читаем файл синхронно
  const wasm = await WebAssembly.instantiate(buffer); // Создаём WebAssembly модуль
  return wasm.instance.exports; // Возвращаем экспортируемые функции
}

// Функция для выполнения побитовых операций
async function testBitwiseOperations() {
  const wasmExports = await loadWasm('module.wasm'); // Путь к вашему WASM файлу

  // Пример использования шестнадцатеричных чисел
  const hex1 = 0xF0F0; // 0xF0F0 = 61680 в десятичной системе
  const hex2 = 0x0F0F; // 0x0F0F = 3863 в десятичной системе

  // Выполнение побитовых операций и вывод в шестнадцатеричном формате
  console.log("AND:", wasmExports.bitwise_and(hex1, hex2).toString(16));
  console.log("OR:", wasmExports.bitwise_or(hex1, hex2).toString(16));
  console.log("XOR:", wasmExports.bitwise_xor(hex1, hex2).toString(16));
  console.log("Shift Left:", wasmExports.shift_left(hex1, 2).toString(16));
  console.log("Shift Right:", wasmExports.shift_right(hex1, 2).toString(16));
}

testBitwiseOperations();
