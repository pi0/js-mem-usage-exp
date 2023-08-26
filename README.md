# Runtime Memory Usage Experiment

Today, I had this crazy question if comments inside js functions consume more memory than comments outside of them?

This was based on the theory that `function().toString()` preserves full function body, including comments:

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

Running benchmarks, I was proven wrong. But still worth sharing benchmark scripts, especially comparing Node.js, Deno, and Bun timing and memory consumption differences.

## Results

Benchmarks running on MBA M2 on Battery with MacOS 14 Beta (23A5286i).

You can run it yourself by cloning this repository and running `./bench.sh` script.

---

Testing ./fixtures/inline.mjs on Node v18.16.0

| Stage         | Time   | Rss       | HeapTotal | HeapUsed   | External   | ArrayBuffers |
| ------------- | ------ | --------- | --------- | ---------- | ---------- | ------------ |
| Init          | 0ms    | 37.91 MiB | 6.08 MiB  | 5.12 MiB   | 414.05 KiB | 19.97 KiB    |
| Imported      | 5.57ms | +9.66 MiB | +4.73 MiB | +4.77 MiB  | +4.72 MiB  | +4.72 MiB    |
| Imported (x2) | 5.68ms | +16 KiB   | +0 Bytes  | +14.67 KiB | +0 Bytes   | +0 Bytes     |
| Called        | 7.7ms  | +0 Bytes  | +0 Bytes  | +768 Bytes | +0 Bytes   | +0 Bytes     |

Testing ./fixtures/inline.mjs on Deno v1.36.3

| Stage         | Time | Rss        | HeapTotal | HeapUsed   | External  |
| ------------- | ---- | ---------- | --------- | ---------- | --------- |
| Init          | 0ms  | 35.27 MiB  | 9.73 MiB  | 8.78 MiB   | 75.01 KiB |
| Imported      | 6ms  | +14.39 MiB | +4.73 MiB | +4.72 MiB  | +0 Bytes  |
| Imported (x2) | 6ms  | +0 Bytes   | +0 Bytes  | +1.63 KiB  | +0 Bytes  |
| Called        | 8ms  | +32 KiB    | +0 Bytes  | +792 Bytes | +0 Bytes  |

Testing ./fixtures/inline.mjs on Bun v0.8.1

| Stage         | Time    | Rss       | HeapTotal | HeapUsed   | External | ArrayBuffers |
| ------------- | ------- | --------- | --------- | ---------- | -------- | ------------ |
| Init          | 0ms     | 18.63 MiB | 805 KiB   | 0 Bytes    | 0 Bytes  | 0 Bytes      |
| Imported      | 19.73ms | +7.84 MiB | +32 KiB   | 313.45 KiB | 0 Bytes  | 0 Bytes      |
| Imported (x2) | 19.76ms | +0 Bytes  | +0 Bytes  | +0 Bytes   | 0 Bytes  | 0 Bytes      |
| Called        | 19.76ms | +0 Bytes  | +0 Bytes  | +0 Bytes   | 0 Bytes  | 0 Bytes      |
