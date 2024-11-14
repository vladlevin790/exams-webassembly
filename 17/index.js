const fs = require('fs');
const path = require('path');

// Функция для загрузки WebAssembly модуля
async function loadWasm(file) {
  const filePath = path.resolve(__dirname, file);
  const buffer = fs.readFileSync(filePath);
  const wasmModule = await WebAssembly.instantiate(buffer);
  return wasmModule.instance.exports;
}

// Функция для проверки перевода двоичного числа в десятичное
async function testBinaryToDecimal() {
  const wasmExports = await loadWasm('binary_to_decimal.wasm'); // Замените на путь к вашему файлу WASM

  // Пример двоичного числа, представленное как целое число
  const binaryNumber = 0b1011; // Это 1011 в двоичной системе, что равно 11 в десятичной

  // Вызываем функцию для перевода
  const decimalNumber = wasmExports.binary_to_decimal(binaryNumber);
  
  // Выводим результат
  console.log(`Двоичное число 1011 в десятичной системе равно: ${decimalNumber}`);
}

// Запуск теста
testBinaryToDecimal();
