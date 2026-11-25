// Fortune Cookie for the Liquidated Trader — entry program (v2).
//
// Writes a single fortune-cookie line to /output/entry.txt:
// one line, 1-160 characters, at most 20 words, fortune voice with
// the trading loss in it, rueful and warm, never cruel.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune. Setup: classic oracular promise — travel, great success.
// Turn: the trader's own "to the moon" dream came true, but only for
// the position — the trader stayed behind with the bill. The double
// meaning of "went to the moon" is the joke: the rocket left without
// its rider, and the loss lands warmly, not as a lecture.
const ENTRY_LINE: string =
  "You will travel and meet great success — your position went to the moon; you stayed behind with the bill.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;
const MAX_WORDS = 20;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-160 characters, over
  // 20 words, or anything that is only whitespace or spans more
  // than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  const words: number = ENTRY_LINE.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    throw new Error(`entry line is ${words} words, must be at most ${MAX_WORDS}`);
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters (${words} words) to ${outPath}`);
}

main();
