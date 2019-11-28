import * as React from 'react';

import * as style from './style.less';

export class Text extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    background: 'black',
  };

  public render(): JSX.Element {
    const { background } = this.props;
    return (
      <div className={style.container}>
        <span
          className={`${style[`background-${background}`]}`}
        >
          {this.props.children}
        </span>
      </div>
    );
  }
}

export type Props = DataProps;

interface DataProps {
  /* Children node */
  children: string;
  /* Background color */
  background?: 'black' | 'red';
}
