# Runtime Memory Usage Experiment

Today, i had this crazy question that if comments inside js functions would consume more memory than comments outside of them.

This was based on the thoery that `function().toString()` preserves full function body, including comments:

```ts
function fn() {
  return "Lorem ipsum dolor sit amet";
}

/*
function fn() {
  return "Lorem ipsum dolor sit amet";
}
*/
console.log(fn.toString());
```

Running benchmarks, i was proven worng. But still worth to share benchmark scripts, specially comparing Node.js, Deno and Bun timing and memory consuption differences.

## Results

Benchamrks running on MBA M2 on Battery with MacOS 14 Beta (23A5286i).

You can run youself by cloning this repository and running `./bench.sh` script.

Testing ./inline.mjs on Node v18.16.0

                  | Time       | Rss           | HeapTotal     | HeapUsed       | External         | ArrayBuffers

----------------- | ---------- | ------------- | ------------- | -------------- | ---------------- | -
Init | 0ms | 38.36 MiB | 6.08 MiB | 5.12 MiB | 414.04 KiB | 19.97 KiB
Imported | 4.77ms | +9.64 MiB | +4.73 MiB | +4.77 MiB | +4.72 MiB | +4.72 MiB
Imported (x2) | 4.92ms | +16 KiB | +0 Bytes | +14.31 KiB | +0 Bytes | +0 Bytes
Called | 7.3ms | +0 Bytes | +0 Bytes | +768 Bytes | +0 Bytes | +0 Bytes

Testing ./inline.mjs on Deno v1.36.3

                  | Time    | Rss            | HeapTotal     | HeapUsed       | External

----------------- | ------- | -------------- | ------------- | -------------- | -
Init | 0ms | 35.34 MiB | 9.73 MiB | 8.78 MiB | 75.01 KiB
Imported | 4ms | +14.39 MiB | +4.73 MiB | +4.72 MiB | +0 Bytes
Imported (x2) | 4ms | +0 Bytes | +0 Bytes | +1.63 KiB | +0 Bytes
Called | 6ms | +16 KiB | +0 Bytes | +792 Bytes | +0 Bytes

Testing ./inline.mjs on Bun v0.8.1

                  | Time        | Rss           | HeapTotal    | HeapUsed       | External         | ArrayBuffers

----------------- | ----------- | ------------- | ------------ | -------------- | ---------------- | -
Init | 0ms | 18.69 MiB | 805 KiB | 0 Bytes | 0 Bytes | 0 Bytes
Imported | 17.32ms | +7.81 MiB | +32 KiB | 313.44 KiB | 0 Bytes | 0 Bytes
Imported (x2) | 17.35ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes
Called | 17.36ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes

pooya@Pooyas-MacBook-Air:~/tmp/exp-comment-mem-usage|⇒ ./bench.sh
Testing ./inline.mjs on Node v18.16.0

-                 | Time       | Rss           | HeapTotal     | HeapUsed       | External         | ArrayBuffers
  ----------------- | ---------- | ------------- | ------------- | -------------- | ---------------- | -
  Init | 0ms | 37.06 MiB | 6.08 MiB | 5.12 MiB | 414.04 KiB | 19.97 KiB
  Imported | 7.37ms | +9.66 MiB | +4.73 MiB | +4.77 MiB | +4.72 MiB | +4.72 MiB
  Imported (x2) | 7.5ms | +16 KiB | +0 Bytes | +14.31 KiB | +0 Bytes | +0 Bytes
  Called | 9.56ms | +0 Bytes | +0 Bytes | +768 Bytes | +0 Bytes | +0 Bytes

Testing ./inline.mjs on Deno v1.36.3

-                 | Time    | Rss            | HeapTotal     | HeapUsed       | External
  ----------------- | ------- | -------------- | ------------- | -------------- | -
  Init | 0ms | 35.33 MiB | 9.73 MiB | 8.78 MiB | 75.01 KiB
  Imported | 6ms | +14.41 MiB | +4.73 MiB | +4.72 MiB | +0 Bytes
  Imported (x2) | 6ms | +0 Bytes | +0 Bytes | +1.63 KiB | +0 Bytes
  Called | 8ms | +0 Bytes | +0 Bytes | +792 Bytes | +0 Bytes

Testing ./inline.mjs on Bun v0.8.1

-                 | Time        | Rss           | HeapTotal    | HeapUsed       | External         | ArrayBuffers
  ----------------- | ----------- | ------------- | ------------ | -------------- | ---------------- | -
  Init | 0ms | 18.78 MiB | 805 KiB | 0 Bytes | 0 Bytes | 0 Bytes
  Imported | 18.91ms | +7.75 MiB | +32 KiB | 313.44 KiB | 0 Bytes | 0 Bytes
  Imported (x2) | 18.94ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes
  Called | 18.95ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes
