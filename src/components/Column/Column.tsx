import React, { useContext } from 'react';

import { AppContext } from '../../AppContext';
import { Props as CardProps } from '../Card';
import VisuallyHidden from '../VisuallyHidden';

import { Column as IColumn } from '../../types/Column';

import styles from './Column.module.css';

type Props = Pick<IColumn, 'id' | 'title' | 'weight'> & {
  children?: React.ReactElement<CardProps> | Array<React.ReactElement<CardProps>>;
};

const Column: React.FunctionComponent<Props> = ({ id, title, children }) => {
  const ctx = useContext(AppContext);

  const hasCards = Boolean(React.Children.count(children));

  return (
    <div className={styles.root}>
      <VisuallyHidden as="h2">{title}</VisuallyHidden>

      <input
        type="text"
        value={title}
        onChange={(event) => {
          ctx?.updateColumn(id, {
            title: event.target.value,
          })
        }}
        className={styles.title}
      />

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