#!/bin/sh

node bench.mjs ./fixtures/inline.mjs
# node bench.mjs ./fixtures/outside.mjs
echo ""

deno run --allow-read bench.mjs ./fixtures/inline.mjs
# deno run --allow-read bench.mjs ./fixtures/outside.mjs
echo ""

bun --bun bench.mjs ./fixtures/inline.mjs
# bun --bun bench.mjs ./fixtures/outside.mjs
echo ""
