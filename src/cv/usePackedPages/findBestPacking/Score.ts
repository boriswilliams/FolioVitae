export class Score {
  private data: [number, number, number];
  
  constructor(pages: number, waste: number, inversions: number) {
    this.data = [pages, waste, inversions];
  }

  betterThan(other: Score | undefined) {
    if (other === undefined)
      return true;
    for (let i = 0; i < this.data.length; i++)
      if (this.data[i] !== other.data[i])
        return this.data[i] < other.data[i];
    return false;
  }
}
