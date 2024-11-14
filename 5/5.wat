(module
  (func $factorial (param $n i32) (result i32)
    (local $result i32)
    (local $i i32)
    (local.set $result (i32.const 1))
    (local.set $i (local.get $n))

    (block $exit
      (loop $loop
        (br_if $exit (i32.eqz (local.get $i)))
        (local.set $result (i32.mul (local.get $result) (local.get $i)))
        (local.set $i (i32.sub (local.get $i) (i32.const 1)))
        (br $loop)
      )
    )
    (local.get $result)
  )

  (export "factorial" (func $factorial))
)
