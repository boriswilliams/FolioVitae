export function* permutations<T>(items: T[]): Generator<T[]> {
  const result = new Array<T>(items.length);
  const all = (1 << items.length) - 1;

  function* getPerms(insertAt: number, usedIndexes: number): Generator<T[]> {
    if (insertAt === items.length) {
      yield result.slice();
      return;
    }

    let available = all & ~usedIndexes;

    while (available) {
      const bit = available & -available;
      const index = 31 - Math.clz32(bit);

      result[insertAt] = items[index];

      yield* getPerms(insertAt + 1, usedIndexes | bit);

      available &= available - 1;
    }
  }

  yield* getPerms(0, 0);
}
