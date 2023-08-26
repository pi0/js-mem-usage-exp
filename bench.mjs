const data = [];

function mark(label) {
  data.push({
    label,
    time: performance.now(),
    mem: {
      ...(process?.memoryUsage() || Deno.memoryUsage()),
    },
  });
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  // prettier-ignore
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function startCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function printTable(obj) {
  const columns = Object.keys(obj[Object.keys(obj)[0]]);
  const maxLens = columns.map((c) => c.length);
  const rows = [
    ["Stage", ...columns.map(startCase)],
    ["", ...columns.map(() => "-")],
  ];
  for (const key in obj) {
    const value = obj[key];
    const row = [
      startCase(key),
      ...columns.map((column) => String(value[column]) || ""),
    ];
    rows.push(row);
    maxLens.forEach((max, i) => (maxLens[i] = Math.max(max, row[i].length)));
  }
  console.log(
    rows
      .map((r, ri) =>
        r
          .map((c, ci) => c.padEnd(maxLens[ci] + 4, ri === 1 ? "-" : " "))
          .join("|")
      )
      .join("\n")
  );
}

const args = process?.argv?.slice(2) || Deno.args;
const entry = args[0];

function getRuntime() {
  if (process?.versions.bun) {
    return `Bun v${process.versions.bun}`;
  }
  if (process?.versions.node) {
    return `Node v${process.versions.node}`;
  }
  return `Deno v${Deno.version.deno}`;
}

// -----

console.log(`Testing ${entry} on ${getRuntime()}\n`);

mark("init");

const { fn } = await import(entry);

mark("imported");

await import(entry);

mark("imported (x2)");

fn();

mark("called");

const diffData = {};
for (let i = 0; i < data.length; i++) {
  const { label, mem } = data[i];
  const prevMem = data[i - 1]?.mem || {};
  const diff = {
    time: Math.round((data[i].time - data[0].time) * 100) / 100 + "ms",
  };
  for (const key in mem) {
    diff[key] = prevMem[key]
      ? "+" + formatBytes(mem[key] - prevMem[key])
      : formatBytes(mem[key]);
  }
  diffData[label] = diff;
}

printTable(diffData);
