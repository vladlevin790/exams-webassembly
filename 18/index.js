const fs = require('fs');
const path = require('path');

// Загрузка WASM модуля
async function loadWasm(file) {
  const filePath = path.resolve(__dirname, file); // Получаем абсолютный путь к файлу
  const buffer = fs.readFileSync(filePath); // Читаем файл синхронно
  const wasmModule = await WebAssembly.instantiate(buffer); // Создаем экземпляр WASM
  return wasmModule.instance.exports;
}

// Тестирование функции суммы чисел от 1 до n
async function testSumRange() {
  const wasmExports = await loadWasm('sum_module.wasm'); // Путь к вашему файлу WASM

  const n = 5;  // Пример: сумма чисел от 1 до 5

  const sum = wasmExports.sum(n); // Вызываем функцию из WASM
  console.log(`Сумма чисел от 1 до ${n}: ${sum}`); // Ожидаемый результат: 15
}

testSumRange();
