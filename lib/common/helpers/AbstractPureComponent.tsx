import React from 'react';

export abstract class AbstractPureComponent<
  P,
  // eslint-disable-next-line @typescript-eslint/ban-types
  S = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  SS = {}
> extends React.PureComponent<P, S, SS> {
  // public componentDidMount: never;
  public getDerivedStateFromProps: never;

  constructor(props: P, context?: any) {
    super(props, context);
  }

  private timeoutIds: number[] = [];

  private requestIds: number[] = [];

  public componentWillUnmount() {
    this.clearTimeouts();
  }

  public setTimeout(callback: () => void, timeout?: number) {
    const handle = window.setTimeout(callback, timeout);
    this.timeoutIds.push(handle);
    return () => window.clearTimeout(handle);
  }

  public clearTimeouts = () => {
    if (this.timeoutIds.length > 0) {
      for (const timeoutId of this.timeoutIds) {
        window.clearTimeout(timeoutId);
      }
      this.timeoutIds = [];
    }
  };
}
