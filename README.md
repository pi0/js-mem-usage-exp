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

---

Testing ./inline.mjs on Node v18.16.0

-                 | Time       | Rss           | HeapTotal     | HeapUsed       | External         | ArrayBuffers
  ----------------- | ---------- | ------------- | ------------- | -------------- | ---------------- | -
  Init | 0ms | 37.03 MiB | 6.08 MiB | 5.12 MiB | 414.04 KiB | 19.97 KiB
  Imported | 7.41ms | +9.63 MiB | +4.73 MiB | +4.77 MiB | +4.72 MiB | +4.72 MiB
  Imported (x2) | 7.54ms | +16 KiB | +0 Bytes | +14.31 KiB | +0 Bytes | +0 Bytes
  Called | 9.58ms | +0 Bytes | +0 Bytes | +768 Bytes | +0 Bytes | +0 Bytes

Testing ./inline.mjs on Deno v1.36.3

-                 | Time    | Rss            | HeapTotal     | HeapUsed       | External
  ----------------- | ------- | -------------- | ------------- | -------------- | -
  Init | 0ms | 34.78 MiB | 9.73 MiB | 8.78 MiB | 75.01 KiB
  Imported | 4ms | +14.38 MiB | +4.73 MiB | +4.72 MiB | +0 Bytes
  Imported (x2) | 4ms | +0 Bytes | +0 Bytes | +1.63 KiB | +0 Bytes
  Called | 6ms | +0 Bytes | +0 Bytes | +792 Bytes | +0 Bytes

Testing ./inline.mjs on Bun v0.8.1

-                 | Time        | Rss           | HeapTotal    | HeapUsed       | External         | ArrayBuffers
  ----------------- | ----------- | ------------- | ------------ | -------------- | ---------------- | -
  Init | 0ms | 18.78 MiB | 805 KiB | 0 Bytes | 0 Bytes | 0 Bytes
  Imported | 18.61ms | +7.8 MiB | +48 KiB | 314.18 KiB | 0 Bytes | 0 Bytes
  Imported (x2) | 18.64ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes
  Called | 18.65ms | +0 Bytes | +0 Bytes | +0 Bytes | 0 Bytes | 0 Bytes
