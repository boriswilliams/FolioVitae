import type { Rules } from '../types';
import { COLUMN_HEIGHT, SAFETY, SECTION_GAP, WASTE_STEP } from '../values';

import { permutations } from './permutations';
import { Score } from './Score';

function calculatePackingTightness(heights: number[], pageOneColumnHeight: number) {
  const capacity = (column: number) => (column < 2 ? pageOneColumnHeight : COLUMN_HEIGHT) - SAFETY;
  const columns: number[] = [];
  let column = 0;
  let currWaste = capacity(0);
  let totalWaste = 0;

  for (const sectionHeight of heights) {
    let height = sectionHeight + (currWaste < capacity(column) ? SECTION_GAP : 0);
    if (height > currWaste && currWaste < capacity(column)) {
      totalWaste += currWaste;
      column++;
      currWaste = capacity(column);
      height = sectionHeight;
    }
    columns.push(column);
    currWaste -= Math.min(height, currWaste);
  }

  return { columns, waste: totalWaste };
}

function countInversions(order: number[]) {
  let count = 0;
  for (let i = 0; i < order.length; i++)
    for (let j = i + 1; j < order.length; j++)
      if (order[i] > order[j])
        count++;
  return count;
}

export function findBestPacking(
  keys: string[],
  heights: number[],
  pageOneColumnHeight: number,
  rules: Rules
) {
  const indices = keys.map((_, i) => i);
  let best = { order: indices, columns: calculatePackingTightness(heights, pageOneColumnHeight).columns };

  const firstSectionKeyIndex = rules.firstSection === undefined ? -1 : keys.indexOf(rules.firstSection);
  const onFirstPage = new Set((rules.sectionsOnFirstPage ?? []).map(key => keys.indexOf(key)));
  let bestScore: Score | undefined;

  for (const order of permutations(indices)) {
    if (firstSectionKeyIndex !== -1 && order[0] !== firstSectionKeyIndex)
      continue;

    const { columns, waste } = calculatePackingTightness(order.map(i => heights[i]), pageOneColumnHeight);
    if (order.some((index, n) => onFirstPage.has(index) && columns[n] > 1))
      continue;

    const score = new Score(
      Math.ceil((columns.at(-1)! + 1) / 2),
      Math.round(waste / WASTE_STEP),
      countInversions(order)
    );
    if (score.betterThan(bestScore)) {
      best = { order, columns };
      bestScore = score;
    }
  }

  return best;
}
