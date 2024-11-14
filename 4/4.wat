(module
  (func $multiply (param $a f32) (param $b f32) (result f32)
    (f32.mul (local.get $a) (local.get $b))
  )

  (func $divide (param $a f32) (param $b f32) (result f32)
    (f32.div (local.get $a) (local.get $b))
  )

  (export "multiply" (func $multiply))
  (export "divide" (func $divide))
)
