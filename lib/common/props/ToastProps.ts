import { ActionProps, CommonProps, MaybeElement } from './CommonProps';
import { IntentProps } from './IntentProps';

export interface ToastProps extends CommonProps, IntentProps {
  action?: ActionProps;
  icon?: MaybeElement;
  message: React.ReactNode;
  onDismiss?: (timeoutExpired: boolean) => void;
  timeout?: number;
  loading?: boolean;
}
