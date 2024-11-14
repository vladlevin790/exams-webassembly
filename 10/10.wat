(module
  (memory 1)
  (export "memory" (memory 0))
  
  (func $to_binary (param $n i32) (param $ptr i32)
    (local $i i32)
    (local $bit i32)
    (local $temp i32)

    (i32.const 0) (local.set $i)
    
    (loop $loop
      (local.set $bit (i32.and (local.get $n) (i32.const 1)))
      (i32.store8 (local.get $ptr) (local.get $bit))
      (local.set $ptr (i32.add (local.get $ptr) (i32.const 1)))
      (local.set $n (i32.shr_u (local.get $n) (i32.const 1)))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (i32.const 32)))
    )
  )
  
  (export "to_binary" (func $to_binary))
)
