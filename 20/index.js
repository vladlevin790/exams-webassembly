const fs = require('fs');
const path = require('path');

async function loadWasm(file) {
    const filePath = path.resolve(__dirname, file); // Путь к файлу
    const buffer = fs.readFileSync(filePath); // Чтение файла
    const wasmModule = await WebAssembly.instantiate(buffer);
    return wasmModule.instance.exports;
}

async function testGetBytes() {
    const wasmExports = await loadWasm('get_bytes.wasm'); // Путь к вашему WASM файлу

    const number = 546384; // Пример числа

    // Печатаем число для проверки
    console.log(`Original number: ${number}`);
    console.log(`Hexadecimal: 0x${number.toString(16)}`);

    // Получаем младший и старший байты
    const lowerByte = wasmExports.get_lower_byte(number);
    const upperByte = wasmExports.get_upper_byte(number);
    
    console.log(`Lower byte: 0x${lowerByte.toString(16)}`);
    console.log(`Upper byte: 0x${upperByte.toString(16)}`);
}

testGetBytes();
