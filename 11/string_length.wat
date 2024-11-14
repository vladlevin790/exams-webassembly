;; задание - Создать WAT-модуль, который принимает строку с завершающим нулем и возвращает её длину.
(module
  (memory (export "memory") 1)
  ;; выделяем память 64 кб для чтения строки

  (func $string_length (param $ptr i32) (result i32)
  ;; объявляем функцию с названием string_length, единственным параметром ptr - указателем на адрес строки и возвращаемым значением с типом i32 
    (local $length i32)
  ;; объявляем переменную length для хранения длины строки
    (loop $count_loop
    ;; объявляем цикл с меткой count_loop
      (if (i32.eqz (i32.load8_u (i32.add (local.get $ptr) (local.get $length))))
      ;; i32.add (local.get $ptr) (local.get $length)) - находим адрес строки 
      ;; (i32.load8_u (i32.add (local.get $ptr) (local.get $length))) загружаем байт из найденного адреса 
      ;; i32.eqz (i32.load8_u (i32.add (local.get $ptr) (local.get $length)))) сравниваем байт с нулем
        (then (return (local.get $length))) ;; если байт = 0, возвращаем длину, значит это конец строки
      )
      (local.set $length (i32.add (local.get $length) (i32.const 1)))
      ;; если байт еще не равен 0, то прибавляем к длине единицу 
      (br $count_loop)
      ;; и переходим на следующую итерацию цикла по указанной метке count_loop
    )
    (local.get $length)
    ;; поскольку функция всегда ждет результат в формате i32, эта строка нужна для удовлетворения этого условия 
    ;; несмотря на то, что наша функция всегда будет возращать результат еще в цикле (return (local.get $length))
  )

  (export "string_length" (func $string_length))
)
