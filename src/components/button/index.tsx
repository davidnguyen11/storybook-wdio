import * as React from 'react';

import * as style from './style.less';

export class Button extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <button id='button' className={style.button}>
        {this.props.children}
      </button>
    );
  }
}

export type Props = StateProps;

interface StateProps {
  /** Children node */
  children: string | React.ReactNode;
  /** Size of button */
  size?: 'small' | 'medium' | 'large';
}
