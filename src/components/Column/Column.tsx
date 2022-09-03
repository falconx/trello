import React, { useContext, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../../AppContext';
import { Props as CardProps } from '../Card';
import VisuallyHidden from '../VisuallyHidden';
import Button, { Variant as ButtonVariant } from '../Button';

import { Column as IColumn } from '../../types/Column';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import styles from './Column.module.css';

type Props = Pick<IColumn, 'id' | 'title' | 'weight'> & {
  children?: React.ReactElement<CardProps> | Array<React.ReactElement<CardProps>>;
};

const Column: React.FunctionComponent<Props> = ({ id, title, children }) => {
  const ctx = useContext(AppContext);
  const rootEl = useRef<HTMLDivElement>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const hasCards = Boolean(React.Children.count(children));

  // hide the add new card UI when clicking outside the column
  useOnClickOutside(rootEl, () => {
    setIsAddingCard(false);
  });

  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newCardTitle) {
      console.warn('No card title was provided');
      return;
    }

    ctx?.addCard(id, {
      id: uuidv4(),
      title: newCardTitle,
      weight: 0,
    });

    // reset add new card fields
    setNewCardTitle('');
  };

  return (
    <>
      <div
        ref={rootEl}
        className={styles.root}
      >
        <VisuallyHidden as="h2">{title}</VisuallyHidden>

        <div className={styles.stack}>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              if (!event.target.value) {
                return;
              }

              ctx?.updateColumn(id, {
                title: event.target.value,
              })
            }}
            className={styles.title}
          />

          {hasCards && (
            <ul className={styles.stack}>
              {React.Children.map(children, child => (
                <li key={child?.props.id}>
                  {child}
                </li>
              ))}
            </ul>
          )}

          {isAddingCard ? (
            <form onSubmit={addCard}>
              <label>
                <VisuallyHidden as="span">Add new card title</VisuallyHidden>

                <textarea
                  className={styles.newCardTitle}
                  value={newCardTitle}
                  onChange={event => setNewCardTitle(event.target.value)}
                  placeholder="Enter a title for this card…"
                  autoFocus
                />
              </label>

              <Button type="submit">
                Add a card
              </Button>
            </form>
          ) : (
            <Button onClick={() => setIsAddingCard(true)}>
              Add a card
            </Button>
          )}
        </div>
      </div>

      <Button
        variant={ButtonVariant.Remove}
        onClick={() => ctx?.removeColumn(id)}
      >
        Remove column
      </Button>
    </>
  );
};

export default Column;