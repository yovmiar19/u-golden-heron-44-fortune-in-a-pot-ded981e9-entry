// Fortune in a Pot — a one-line fortune for a houseplant.
// The program's only job: write the fortune to /output/entry.txt
// exactly as written, with no trailing newline and no extra bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune itself: kind, funny, and written for the plant on the
// windowsill — the orange cat naps beside it, tail twitching.
const FORTUNE =
  "The orange cat will sleep beside you today, but do not trust his twitching tail.";

function main(): void {
  // The sealed scorer only accepts 1..120 characters, so refuse to
  // write anything out of range rather than ship an invalid entry.
  if (FORTUNE.length < 1 || FORTUNE.length > 120) {
    throw new Error(`fortune is ${FORTUNE.length} chars, must be 1..120`);
  }
  if (FORTUNE.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), FORTUNE, "utf8");
}

main();
