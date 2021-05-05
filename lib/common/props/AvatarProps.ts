export const AvatarSize = {
  small: 'small' as const,
  medium: 'medium' as const,
  large: 'large' as const,
};

export type AvatarSize = typeof AvatarSize[keyof typeof AvatarSize];
