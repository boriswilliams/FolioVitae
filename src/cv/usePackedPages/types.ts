export type Page<T extends string> = [T[], T[]];

export type Rules = {
  firstSection?: string;
  sectionsOnFirstPage?: string[];
};
