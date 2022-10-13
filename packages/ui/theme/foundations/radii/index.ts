const radii = {
  base: '0.4rem',
  zero: '0',
  full: '999999rem',
} as const;

export type radii = typeof radii;
export default radii;
