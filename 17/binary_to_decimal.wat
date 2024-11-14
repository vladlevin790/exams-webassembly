(module
  ;; Объявляем память для хранения данных
  (memory $mem 1)
  (export "mem" (memory $mem))

  ;; Функция для перевода двоичного числа в десятичное
  (func $binary_to_decimal (param $bin i32) (result i32)
    ;; Локальная переменная для хранения результата
    (local $result i32)
    (local $power i32) ;; Локальная переменная для степени двойки
    (local $i i32) ;; Индекс цифры в двоичном числе
    (local $bit i32) ;; Локальная переменная для хранения текущего бита

    ;; Инициализация локальных переменных
    (local.set $result (i32.const 0)) ;; Изначально результат равен 0
    (local.set $power (i32.const 1))  ;; Начинаем с 2^0
    (local.set $i (i32.const 0))      ;; Индекс равен 0

    (loop $loop
      ;; Получаем бит (0 или 1) из двоичного числа
      (local.set $bit (i32.and (i32.shr_u (local.get $bin) (local.get $i)) (i32.const 1)))

      ;; Если бит равен 1, добавляем к результату соответствующую степень двойки
      (local.set $result (i32.add (local.get $result) (i32.mul (local.get $bit) (local.get $power))))

      ;; Увеличиваем степень двойки (умножаем на 2)
      (local.set $power (i32.mul (local.get $power) (i32.const 2)))

      ;; Увеличиваем индекс
      (local.set $i (i32.add (local.get $i) (i32.const 1)))

      ;; Проверяем, нужно ли продолжить цикл (если число не закончилось)
      (br_if $loop (i32.ne (local.get $i) (i32.const 32))) ;; Останавливаем, если достигли 32 разряда
    )

    ;; Возвращаем результат
    (local.get $result)
  )

  ;; Экспортируем функцию для использования в JavaScript
  (export "binary_to_decimal" (func $binary_to_decimal))
)
