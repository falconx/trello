import React from 'react';

import { Column as IColumn } from '../../types/Column';
import { Props as CardProps } from '../Card';

import styles from './Column.module.css';

type Props = Pick<IColumn, 'id' | 'title' | 'weight'> & {
  children?: React.ReactElement<CardProps> | Array<React.ReactElement<CardProps>>;
};

const Column: React.FunctionComponent<Props> = ({ title, children }) => {
  const hasCards = Boolean(React.Children.count(children));

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      {hasCards && (
        <ul>
          {React.Children.map(children, child => (
            <li
              key={child?.props.id}
              className={styles.card}
            >
              {child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Column;