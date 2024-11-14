(module
  (memory 1)
  (data (i32.const 0) "42")
  (func $getNumber (result i32)
    (i32.load (i32.const 0))
  )
  (export "getNumber" (func $getNumber))
)
