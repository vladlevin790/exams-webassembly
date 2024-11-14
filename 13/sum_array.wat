(module
  (memory $0 1)
  (export "memory" (memory $0))
  ;; выделяем 64 кб памяти 

  (func $sum_array (param $arr i32) (param $length i32) (result i32)
  ;; передаем в функцию указатель на элемент массива и длину массива, в результате ждем результат типа i32
    (local $sum i32)
    ;; переменная в которую будем записывать сумму
    (local $i i32)
    ;; текущая итерация цикла
    (local $currentValue i32)
    ;; текущее значение по указанному в $arr адресу

    (local.set $sum (i32.const 0))
    ;; присваиваем нулевые значения
    (local.set $i (i32.const 0))

    (loop $loop
      (block $done
        (br_if $done (i32.ge_s (local.get $i) (local.get $length)))
        ;; блок $done завершится, если текущая итерация превышает длину массива
        (local.set $currentValue (i32.load (i32.add (local.get $arr) (i32.mul (local.get $i) (i32.const 4)))))
        ;; (i32.mul (local.get $i) (i32.const 4)) - вычисляет смещение для текущего элемента массива в байтах, тк 1 элемент типа int занимает 4 байта памяти
        ;; (i32.add (local.get $arr) (i32.mul (local.get $i) (i32.const 4))) - затем прибавляется это смещение (умноженное на 4) к адресу начала массива, который хранится в $arr
        ;; инструкция i32.load извлекает значение из памяти по вычисленному адресу
        (local.set $sum (i32.add (local.get $sum) (local.get $currentValue))) 
        ;; записываем в переменную суммы текущее значение и значение текущего элемента массива, которое вычислили ранее 
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        ;; прибавляем 1 к переменной, чтобы перейти на след итерацию
        (br $loop)
      )
    )

    (local.get $sum)
  )

  (export "sum_array" (func $sum_array))
)
