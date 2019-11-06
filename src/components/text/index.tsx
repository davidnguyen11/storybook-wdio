import * as React from 'react';

import * as style from './style.less';

export class Text extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    background: 'black',
  };

  public render(): JSX.Element {
    const { background } = this.props;
    return (
      <span
        className={`${style.container} ${style[`background-${background}`]}`}
      >
        {this.props.children}
      </span>
    );
  }
}

export type Props = StateProps;

interface StateProps {
  /* Children node */
  children: string;
  /* Background color */
  background?: 'black' | 'red';
}
