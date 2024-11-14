(module
  ;; Объявляем область памяти 64 кб
  (memory (export "memory") 1)

  ;; Функция копирования строки, src_ptr указатель на адрес текущей строки,  dest_ptr на адрес скопированной строки
  (func $copy_string (param $src_ptr i32) (param $dest_ptr i32) (result i32)
    (local $byte i32) ;; Локальная переменная для хранения текущего байта

    ;; Начало цикла
    (loop $copy_loop
      ;; Читаем байт из исходной строки
      (local.set $byte (i32.load8_u (local.get $src_ptr)))

      ;; Записываем байт в место назначения
      (i32.store8 (local.get $dest_ptr) (local.get $byte))

      ;; Проверяем, достигли ли конца строки (нулевой байт)
      (if (i32.eqz (local.get $byte))
        (then
          (return (local.get $dest_ptr)) ;; Если байт нулевой, завершаем копирование
        )
      )

      ;; Переходим к следующему байту в исходной строке и месте назначения
      (local.set $src_ptr (i32.add (local.get $src_ptr) (i32.const 1)))
      (local.set $dest_ptr (i32.add (local.get $dest_ptr) (i32.const 1)))

      ;; Возвращаемся в начало цикла
      (br $copy_loop)
    )
    ;; Возвращаем указатель на начало строки назначения
    (local.get $dest_ptr)
  )

  ;; Экспортируем функцию
  (export "copy_string" (func $copy_string))
)
