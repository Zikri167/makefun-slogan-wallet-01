// One-Line Slogan for a Solana Wallet Agent.
// Deterministic, no network, Node 22 stdlib only.
// Writes exactly one slogan (one line, <= 20 words, <= 140 chars)
// to /output/entry.txt (or OUTPUT_PATH / --output when given).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The slogan: names the Solana wallet up front, fresh "hired a tiny
// butler" image (no keys/moons/bags), plain-words promise a newcomer
// gets on one read (sends, swaps, saves), a hired-helper / sip-coffee
// contrast that is easy to repeat, and nothing it cannot deliver.
const SLOGAN =
  "Your Solana wallet hired a tiny butler \u2014 it sends, swaps, and saves while you sip coffee.";

function outputPath() {
  const flag = process.argv.find((a) => a.startsWith("--output="));
  if (flag) return flag.slice("--output=".length);
  const idx = process.argv.indexOf("--output");
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  if (process.env.OUTPUT_PATH) return process.env.OUTPUT_PATH;
  return "/output/entry.txt";
}

const out = outputPath();
// Self-check against the competition gate: one line, 1-140 chars,
// at most 20 words. Fail loudly instead of writing an invalid entry.
const words = SLOGAN.trim().split(/\s+/).length;
if (SLOGAN.includes("\n") || SLOGAN.length < 1 || SLOGAN.length > 140 || words > 20) {
  throw new Error("slogan violates gate: must be one line, 1-140 chars, <= 20 words");
}
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, SLOGAN + "\n", "utf8");
