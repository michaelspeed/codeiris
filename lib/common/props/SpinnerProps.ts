export const SpinnerSize = {
  small: 'small' as const,
  medium: 'medium' as const,
  large: 'large' as const,
};

export type SpinnerSize = typeof SpinnerSize[keyof typeof SpinnerSize];
