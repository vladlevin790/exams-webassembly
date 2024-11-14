(module
  (func $sum (param $a i32) (param $b i32) (result i32)
    (i32.add (local.get $a) (local.get $b))
  )
  (export "sum" (func $sum))
)
