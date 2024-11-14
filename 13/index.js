const fs = require('fs');
const path = require('path');

// Функция для загрузки и создания экземпляра WebAssembly-модуля
async function loadWasm(file) {
  const filePath = path.resolve(__dirname, file); // Получаем абсолютный путь к файлу
  const buffer = fs.readFileSync(filePath); // Читаем файл синхронно
  const wasmModule = await WebAssembly.instantiate(buffer); // Создаём WebAssembly-модуль из буфера
  return wasmModule.instance.exports; // Возвращаем экспортированные функции и память 
}

// Функция для вызова sum_array с массивом чисел
async function testSumUntilLimit() {
  const wasmExports = await loadWasm('sum_array.wasm');

  // Пример данных - массив чисел
  const array = new Int32Array([10, 20, 30, 40, 50, 5, 7]);

  // Используем память WebAssembly для хранения данных
  const memoryView = new Int32Array(wasmExports.memory.buffer);

  // Копируем данные из JavaScript массива в память WebAssembly
  const memoryOffset = 0; // Предположим, что начинаем с нулевого смещения
  memoryView.set(array, memoryOffset);

  // Вызываем функцию sum_array, передавая смещение в память и длину массива
  const sum = wasmExports.sum_array(memoryOffset, array.length);

  // Выводим результат
  console.log(`Сумма элементов массива: ${sum}`);
}

// Запуск теста
testSumUntilLimit();
