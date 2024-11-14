(module
  ;; Функция для подсчета количества единичных битов
  (func $count_ones (param $n i32) (result i32)
    (local $count i32) ;; Переменная для хранения счета единичных битов
    (local $bit i32)   ;; Переменная для текущего бита
    
    ;; Инициализируем счетчик единичных битов
    (local.set $count (i32.const 0))

    ;; Цикл для подсчета единичных битов
    (loop $loop
      ;; Проверяем младший бит числа
      (local.set $bit (i32.and (local.get $n) (i32.const 1)))
      ;; Если бит равен 1, увеличиваем счетчик
      (local.set $count (i32.add (local.get $count) (local.get $bit)))
      ;; Сдвигаем число вправо на 1 бит
      (local.set $n (i32.shr_u (local.get $n) (i32.const 1)))
      ;; Если число не стало нулем, продолжаем цикл
      (br_if $loop (i32.ne (local.get $n) (i32.const 0)))
    )

    ;; Возвращаем результат — количество единичных битов
    (local.get $count)
  )
  
  ;; Экспортируем функцию
  (export "count_ones" (func $count_ones))
)
