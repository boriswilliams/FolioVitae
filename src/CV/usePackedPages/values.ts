const MM = 96 / 25.4;
// A4 height minus the 15mm top and bottom margins
export const COLUMN_HEIGHT = 267 * MM;
export const PAGE_PADDING = 15 * MM;
export const SECTION_GAP = 7 * MM;
// Leeway so a section that only just fits isn't pushed over in print
export const SAFETY = 2 * MM;
// Empty space is compared in steps of this, so tiny gains don't reorder sections
export const WASTE_STEP = 10 * MM;
