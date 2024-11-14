import { readFileSync } from 'fs';

(async () => {
    const wasmBuffer = readFileSync('hello.wasm');
    const wasmModule = await WebAssembly.instantiate(wasmBuffer, {});

    const { memory, allocateMemory, writeString } = wasmModule.instance.exports;

    const encoder = new TextEncoder();
    const inputString = 'hello!';
    const encodedString = encoder.encode(inputString + '\0'); 

    const ptr = allocateMemory(encodedString.length);

    const buffer = new Uint8Array(memory.buffer, ptr, encodedString.length);
    buffer.set(encodedString);

    writeString(ptr, ptr, encodedString.length);

    const result = new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, encodedString.length));
    console.log('Результат:', result);
})();



// (module
//     (memory (export "memory") 1)
  
//     (global $heap (mut i32) (i32.const 1024)) ;; Начало выделяемой области памяти
  
//     (func $allocateMemory (export "allocateMemory") (param $size i32) (result i32)
//       (local $current_heap i32)
  
//       ;; Сохраняем текущее значение указателя кучи
//       (global.get $heap)
  
//       ;; Сохраняем текущее значение указателя кучи
//       (local.set $current_heap)
  
//       ;; Обновляем указатель кучи, добавляя размер выделяемой области
//       (global.set $heap
//         (i32.add
//           (global.get $heap)
//           (local.get $size)
//         )
//       )
  
//       ;; Возвращаем начальный адрес выделяемой области
//       (local.get $current_heap)
//     )
  
//     (func $writeString (export "writeString") (param $ptr i32) (param $strPtr i32) (param $len i32)
//       (local $i i32)
//       (local $c i32)
//       (local.set $i (i32.const 0))
  
//       (loop $loop
//         (local.set $c
//           (i32.load8_s
//             (i32.add
//               (local.get $strPtr)
//               (local.get $i)
//             )
//           )
//         )
//         (i32.store8
//           (i32.add
//             (local.get $ptr)
//             (local.get $i)
//           )
//           (local.get $c)
//         )
//         (local.set $i
//           (i32.add
//             (local.get $i)
//             (i32.const 1)
//           )
//         )
//         (br_if $loop
//           (i32.ne
//             (local.get $c)
//             (i32.const 0)
//           )
//         )
//       )
//     )
//   )
  