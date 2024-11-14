(module
  ;; Функция для получения младшего байта числа
  (func (export "get_lower_byte") (param i32) (result i32)
    ;; Младший байт: применяем побитовую операцию AND с маской 0xFF
    (i32.and (local.get 0) (i32.const 0xFF))
  )

  ;; Функция для получения старшего байта числа
  (func (export "get_upper_byte") (param i32) (result i32)
    ;; Старший байт: сдвигаем число вправо на 8 бит и применяем побитовую операцию AND с маской 0xFF
    (i32.and (i32.shr_u (local.get 0) (i32.const 8)) (i32.const 0xFF))
  )
)
