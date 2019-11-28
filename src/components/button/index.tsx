import * as React from 'react';

import * as style from './style.less';

export class Button extends React.Component<Props> {
  public render(): JSX.Element {
    const className = [style.container, style[this.props.size || '']];

    return (
      <button onClick={this.props.onClick} id="button" className={className.join(' ')}>
        {this.props.children}
      </button>
    );
  }
}

export type Props = DataProps & EventProps;

interface DataProps {
  /** Children node */
  children: string | React.ReactNode;
  /** Size of button */
  size?: 'small' | 'medium' | 'large';
}

interface EventProps {
  /** Click event */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
