import { AbstractPureComponent, Intent } from '../../../../lib/common';
import { ToastProps } from '../../../../lib/common/props/ToastProps';
import React from 'react';
import styles from './toast.module.css';
import clsx from 'clsx';

interface ToastState {
  icon: React.ReactNode | null;
}

function CloseIcon({ onClick }) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 hover:text-error transition-all"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export default class Toast extends AbstractPureComponent<
  ToastProps,
  ToastState
> {
  public static defaultProps: ToastProps = {
    className: '',
    message: '',
    timeout: 5000,
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: null,
    };
  }

  static getDerivedStateFromProps(props: ToastProps, state: ToastState) {
    if (props.icon) {
      return {
        icon: props.icon,
      };
    }
    return {};
  }

  render() {
    const { message, loading } = this.props;

    return (
      // TODO: add loading
      <div
        className={clsx(
          'flex items-center max-w-sm w-full mb-4 text-white py-3 px-4 rounded-lg transition-all',
          styles['toast-item'],
        )}
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        {this.getIcon()}

        <div className="flex-grow mx-3">{message}</div>

        <CloseIcon onClick={this.dismissToast} />
      </div>
    );
  }

  dismissToast = () => {
    this.clearTimeouts();
    this.triggerDismiss(true);
  };

  getIcon() {
    if (this.state.icon) {
      return this.state.icon;
    } else {
      switch (this.props.intent) {
        case Intent.PRIMARY:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          );
        case Intent.INFO:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-info"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
        case Intent.ERROR:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-error"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          );
        case Intent.SUCCESS:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          );
        case Intent.WARNING:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-warning"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          );
        case Intent.QUESTION:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-question"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
        default:
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          );
      }
    }
  }

  componentDidMount() {
    this.startTimeout();
  }

  componentDidUpdate(prevProps: ToastProps) {
    if (prevProps.timeout !== this.props.timeout) {
      if (this.props.timeout! > 0) {
        this.startTimeout();
      } else {
        this.clearTimeouts();
      }
    }
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  private triggerDismiss(didTimeoutExpire: boolean) {
    this.clearTimeouts();
    this.props.onDismiss?.(didTimeoutExpire);
  }

  private startTimeout = () => {
    this.clearTimeouts();
    if (this.props.timeout > 0) {
      this.setTimeout(() => this.triggerDismiss(true), this.props.timeout);
    }
  };
}
