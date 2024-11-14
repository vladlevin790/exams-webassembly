(module
  (func $add (param $a i32) (param $b i32) (result i32)
    (i32.add (local.get $a) (local.get $b))
  )

  (func $sub (param $a i32) (param $b i32) (result i32)
    (i32.sub (local.get $a) (local.get $b))
  )

  (func $mul (param $a i32) (param $b i32) (result i32)
    (i32.mul (local.get $a) (local.get $b))
  )

  (func $div (param $a i32) (param $b i32) (result i32)
    (i32.div_s (local.get $a) (local.get $b))
  )

  (export "add" (func $add))
  (export "sub" (func $sub))
  (export "mul" (func $mul))
  (export "div" (func $div))
)
