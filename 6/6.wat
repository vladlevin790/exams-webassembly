(module
  (func $is_even (param $n i32) (result i32)
    (if (result i32)
      (i32.eqz (i32.rem_u (local.get $n) (i32.const 2)))
      (then (i32.const 1))
      (else (i32.const 0))
    )
  )
  (export "is_even" (func $is_even))
)