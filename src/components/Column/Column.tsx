import React, { useContext, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../../AppContext';
import { Props as CardProps } from '../Card';
import VisuallyHidden from '../VisuallyHidden';
import Button, { Variant as ButtonVariant } from '../Button';
import EditableTitleField from '../EditableTitleField';
import Input from '../Input';

import { Column as IColumn } from '../../types/Column';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import styles from './Column.module.css';

type Props = Pick<IColumn, 'id' | 'title'> & {
  children?: React.ReactElement<CardProps> | Array<React.ReactElement<CardProps>>;
};

const Column: React.FunctionComponent<Props> = ({ id, title, children }) => {
  const ctx = useContext(AppContext);
  const rootEl = useRef<HTMLDivElement>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  const hasCards = Boolean(React.Children.count(children));

  // hide the add new card UI when clicking outside the column
  useOnClickOutside(rootEl, () => {
    setIsAddingCard(false);
  });

  // use classnames lib if we end up doing this a lot
  const rootClasses = [styles.root];
  if (isHighlighted) {
    rootClasses.push(styles.highlight);
  }

  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newCardTitle) {
      console.warn('No card title was provided');
      return;
    }

    ctx.addCard({
      id: uuidv4(),
      columnId: id,
      title: newCardTitle,
    });

    // reset add new card fields
    setNewCardTitle('');
  };

  return (
    <>
      <div
        ref={rootEl}
        className={rootClasses.join(' ')}
        draggable
        onDragEnter={() => {
          const activeCard = ctx.state.cards.find(card => card.id === ctx.state.activeDragCardId);

          // only highlight columns which the card doesn't already belong to
          if (activeCard?.columnId !== id) {
            setIsHighlighted(true);
          }
        }}
        onDragLeave={() => {
          setIsHighlighted(false);
        }}
        onDragEnd={() => {
          setIsHighlighted(false);
        }}
        onDragOver={event => {
          // prevent default to allow drop
          event.preventDefault();
        }}
        onDrop={event => {
          // preven`t default action (open as link for some elements)
          event.preventDefault();

          if (!ctx.state.activeDragCardId) {
            return;
          }

          ctx.updateCard(ctx.state.activeDragCardId, { columnId: id });
          setIsHighlighted(false);
        }}
      >
        <VisuallyHidden as="h2">{title}</VisuallyHidden>

        <div className={styles.stack}>
          <div className={styles.title}>
            <EditableTitleField
              label="Column title"
              value={title}
              onChange={(event) => {
                if (!event.target.value) {
                  return;
                }

                ctx.updateColumn(id, {
                  title: event.target.value,
                })
              }}
            />
          </div>

          {(hasCards || isHighlighted) && (
            <ul className={styles.stack}>
              {React.Children.map(children, child => (
                <li key={child?.props.id}>
                  {child}
                </li>
              ))}

              {isHighlighted && (
                <li
                  aria-hidden="true"
                  className={styles.dropzone}
                />
              )}
            </ul>
          )}

          {isAddingCard ? (
            <form onSubmit={addCard} className={styles.stack}>
              <Input
                label="Add new card title"
                value={newCardTitle}
                onChange={event => setNewCardTitle(event.target.value)}
                placeholder="Enter a title for this card…"
                autoFocus
              />

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
        onClick={() => ctx.removeColumn(id)}
      >
        Remove column
      </Button>
    </>
  );
};

export default Column;