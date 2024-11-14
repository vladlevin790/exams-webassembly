(module
  (func $is_even (param $n i32) (result i32)
    (i32.and (local.get $n) (i32.const 1))
  )
  (export "is_even" (func $is_even))
)
