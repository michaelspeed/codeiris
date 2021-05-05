export const Intent = {
  PRIMARY: 'PRIMARY' as const,
  SECONDARY: 'SECONDARY' as const,
  ERROR: 'ERROR' as const,
  SUCCESS: 'SUCCESS' as const,
  WARNING: 'WARNING' as const,
  INFO: 'INFO' as const,
  QUESTION: 'QUESTION' as const,
};

export type Intent = typeof Intent[keyof typeof Intent];
