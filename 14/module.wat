(module
  ;; Экспортируем память для работы с данными
  (memory $0 1)
  (export "memory" (memory $0))

  ;; Функция для побитового "И" (AND) между двумя шестнадцатеричными числами
  (func $bitwise_and (param $a i32) (param $b i32) (result i32)
    (i32.and (local.get $a) (local.get $b))
  )

  ;; Функция для побитового "ИЛИ" (OR) между двумя шестнадцатеричными числами
  (func $bitwise_or (param $a i32) (param $b i32) (result i32)
    (i32.or (local.get $a) (local.get $b))
  )

  ;; Функция для побитового "Исключающее ИЛИ" (XOR) между двумя шестнадцатеричными числами
  (func $bitwise_xor (param $a i32) (param $b i32) (result i32)
    (i32.xor (local.get $a) (local.get $b))
  )

  ;; Функция для сдвига влево
  (func $shift_left (param $a i32) (param $shift i32) (result i32)
    (i32.shl (local.get $a) (local.get $shift))
  )

  ;; Функция для сдвига вправо
  (func $shift_right (param $a i32) (param $shift i32) (result i32)
    (i32.shr_s (local.get $a) (local.get $shift)) ;; с учетом знака
  )

  ;; Экспортируем функции, чтобы они были доступны для JavaScript
  (export "bitwise_and" (func $bitwise_and))
  (export "bitwise_or" (func $bitwise_or))
  (export "bitwise_xor" (func $bitwise_xor))
  (export "shift_left" (func $shift_left))
  (export "shift_right" (func $shift_right))
)
