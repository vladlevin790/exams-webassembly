const fs = require('fs');
const path = require('path');

async function loadWasm(file) {
    const filePath = path.resolve(__dirname, file); // Resolves the absolute path of the wasm file
    const buffer = fs.readFileSync(filePath); // Synchronously read the file
    const wasmModule = await WebAssembly.instantiate(buffer);
    return wasmModule.instance.exports;
}

async function testCountOnes() {
    const wasmExports = await loadWasm('bit.wasm'); // Path to your WASM file
    
    const number = 0b1011100101; // Example: 45 in decimal (binary representation: 101101)
    
    // Output the number of ones
    console.log("Number of ones:", wasmExports.count_ones(number));
}

testCountOnes();
