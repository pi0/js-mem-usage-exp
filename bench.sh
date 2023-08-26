#!/bin/sh

node bench.mjs ./inline.mjs
# node bench.mjs ./outside.mjs
echo ""

deno run --allow-read bench.mjs ./inline.mjs
# deno run --allow-read bench.mjs ./outside.mjs
echo ""

bun --bun bench.mjs ./inline.mjs
# bun --bun bench.mjs ./outside.mjs
echo ""
