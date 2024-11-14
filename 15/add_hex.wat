(module
  (func $add_hex (param $a i32) (param $b i32) (result i32)
    (local $sum i32)
    
    ;; Сложение двух чисел
    (local.set $sum (i32.add (local.get $a) (local.get $b)))

    ;; Возвращаем результат сложения
    (local.get $sum)
  )

  ;; Экспортируем функцию add_hex_numbers
  (export "add_hex" (func $add_hex))
)
