const fs = require('fs');
const path = require('path');

// Функция для загрузки WebAssembly модуля
async function loadWasm(file) {
  const filePath = path.resolve(__dirname, file); // Получаем абсолютный путь к файлу
  const buffer = fs.readFileSync(filePath); // Читаем файл синхронно
  const wasm = await WebAssembly.instantiate(buffer); // Создаём WebAssembly модуль
  return wasm.instance.exports; // Возвращаем экспортируемые функции
}

// Функция для выполнения операции сложения
async function testAddition() {
  const wasmExports = await loadWasm('add_hex.wasm'); // Путь к вашему WASM файлу

  // Пример использования шестнадцатеричных чисел
  const hex1 = 0xF0F0; // 0xF0F0 = 61680 в десятичной системе
  const hex2 = 0x0F0F; // 0x0F0F = 3863 в десятичной системе

  // Выполнение операции сложения
  const sum = wasmExports.add_hex(hex1, hex2);
  console.log(`Сумма (в шестнадцатеричной): ${sum.toString(16)}`);
  console.log(`Сумма (в десятичной): ${sum}`);
}

testAddition();
