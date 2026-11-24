// Fortune in a Pot — one fortune, written for the houseplant on the windowsill.
//
// The keeper means well, but the plant has a warning to pass on: the tall
// man and his plastic watering can are loving it to death. The fortune is
// built from two clauses so the omen and its punchline stay in order, then
// written byte-exact to the entry file, with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The omen: who to watch out for, and the instrument of his affection.
const OMEN = "Beware the tall man with the plastic watering can;";
// The verdict: what his kindness is really doing to the plant.
const VERDICT = "his affection is drowning you.";

const MAX_CHARS = 120;
const DEFAULT_OUTPUT_DIR = "/output";
const ENTRY_FILENAME = "entry.txt";

/** Join the omen and the verdict into the single fortune line. */
function composeFortune(): string {
  return `${OMEN} ${VERDICT}`;
}

/** Where the fortune goes: an output-dir override when set, else /output. */
function entryPath(): string {
  const dir =
    process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  return join(dir, ENTRY_FILENAME);
}

/** A fortune must be a real line: 1 to 120 characters, not blank, one line. */
function assertValidFortune(fortune: string): void {
  if (fortune.trim().length === 0) {
    throw new Error("fortune must not be blank");
  }
  if (fortune.includes("\n") || fortune.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  if (fortune.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${fortune.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
}

function main(): void {
  const fortune = composeFortune();
  assertValidFortune(fortune);
  const path = entryPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, fortune, "utf8");
}

main();
