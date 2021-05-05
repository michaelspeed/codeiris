export const Position = {
  BOTTOM: 'bottom' as const,
  LEFT: 'left' as const,
  RIGHT: 'right' as const,
  TOP: 'top' as const,
};

export type Position = typeof Position[keyof typeof Position];
