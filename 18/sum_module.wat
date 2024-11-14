(module
  ;; Объявляем память размером 1 страницы (64 КБ)
  (memory $mem 1)
  (export "mem" (memory $mem))

  ;; Функция для вычисления суммы чисел от 1 до n
  (func $sum (param $n i32) (result i32)
    (local $sum i32)
    (local $i i32)
    
    ;; Инициализация суммы и счетчика
    (local.set $sum (i32.const 0))
    (local.set $i (i32.const 1))

    ;; Цикл для суммирования чисел от 1 до n
    (block $exit
      (loop $loop
        (br_if $exit (i32.gt_s (local.get $i) (local.get $n)))  ;; Выход из цикла, если i > n
        (local.set $sum (i32.add (local.get $sum) (local.get $i)))  ;; Прибавляем i к сумме
        (local.set $i (i32.add (local.get $i) (i32.const 1)))  ;; Увеличиваем i на 1
        (br $loop)  ;; Повторяем цикл
      )
    )

    ;; Возвращаем результат (сумма)
    (local.get $sum)
  )
  
  ;; Экспортируем функцию
  (export "sum" (func $sum))
)
