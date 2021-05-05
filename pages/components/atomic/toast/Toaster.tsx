import ReactDOM from 'react-dom';
import { AbstractPureComponent, Position } from '../../../../lib/common';
import { ToastProps } from '../../../../lib/common/props/ToastProps';
import Overlay from '../overlay';
import { CommonProps } from 'lib/common/props/CommonProps';
import Toast from './Toast';
import { isServer } from '../../../../lib/apollo';
import clsx from 'clsx';
import './toast.module.css';

// TODO Toaster is still not ready for SSR usage

export type ToasterPosition = typeof Position.TOP | typeof Position.BOTTOM;
export interface ToasterProps extends CommonProps {
  usePortal?: boolean;
  position?: ToasterPosition;
  maxToasts?: number;
}

export type ToastOptions = ToastProps & { key: string };

export interface ToasterState {
  toasts: ToastOptions[];
}
interface ToasterHelper {
  show(props: ToastProps, key?: string): string;
  dismiss(key: string): void;
  clear(): void;
}

class Toaster
  extends AbstractPureComponent<ToasterProps, ToasterState>
  implements ToasterHelper {
  public static defaultProps: ToasterProps = {
    position: Position.TOP,
    usePortal: false,
  };

  public static create(
    props?: ToasterProps,
    container = !isServer() ? document.body : null,
  ): Toaster | null {
    if (!isServer()) {
      const containerElement = document.createElement('div');
      container.appendChild(containerElement);
      return ReactDOM.render<ToasterProps>(
        <Toaster {...props} usePortal={false} />,
        containerElement,
      ) as Toaster;
    } else {
      return null;
    }
  }

  private toastId = 0;

  public state = {
    toasts: [],
  };

  render() {
    return (
      <div
        className={clsx(
          this.getPosition(),
          'flex flex-col-reverse items-center absolute w-full',
        )}
      >
        {this.state.toasts.map(this.renderToast, this)}
        {this.props.children}
      </div>
    );
  }

  getPosition() {
    switch (this.props.position) {
      case Position.TOP:
        return 'top-2';
      case Position.BOTTOM:
        return 'bottom-2';
      default:
        return 'bottom-2';
    }
  }

  public show(props: ToastProps, key?: string): string {
    if (this.props.maxToasts) {
      this.dismissIfAtLimit();
    }
    const options = this.createToastOptions(props, key);
    if (key === undefined || this.isNewToastKey(key)) {
      this.setState((prevState) => ({
        toasts: [options, ...prevState.toasts],
      }));
    } else {
      this.setState((prevState) => ({
        toasts: prevState.toasts.map((t) => (t.key === key ? options : t)),
      }));
    }
    return options.key;
  }

  private renderToast = (toast: ToastOptions) => {
    return <Toast {...toast} onDismiss={this.getDismissHandler(toast)} />;
  };

  private getDismissHandler = (toast: ToastOptions) => (
    timeoutExpired: boolean,
  ) => {
    this.dismiss(toast.key, timeoutExpired);
  };

  private isNewToastKey(key: string) {
    return this.state.toasts.every((toast) => toast.key !== key);
  }

  clear() {
    this.state.toasts.forEach((t) => t.onDismiss?.(false));
    this.setState({ toasts: [] });
  }

  public dismiss(key: string, timeoutExpired = false) {
    this.setState(({ toasts }) => ({
      toasts: toasts.filter((t) => {
        const matchesKey = t.key === key;
        if (matchesKey) {
          t.onDismiss?.(timeoutExpired);
        }
        return !matchesKey;
      }),
    }));
  }

  private createToastOptions(
    props: ToastProps,
    key = `toast-${this.toastId++}`,
  ) {
    return { ...props, key };
  }

  private dismissIfAtLimit() {
    if (this.state.toasts.length === this.props.maxToasts) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.dismiss(this.state.toasts[this.state.toasts.length - 1].key!);
    }
  }
}

export default Toaster;
