import { useContext, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../../AppContext';
import VisuallyHidden from '../VisuallyHidden';
import Card from '../Card';
import Column from '../Column';
import Button from '../Button';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import styles from './Board.module.css';
import columnStyles from '../Column/Column.module.css';

const Board: React.FunctionComponent = () => {
  const { state, ...ctx } = useContext(AppContext);
  const addColumnEl = useRef<HTMLLIElement>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // hide the add new card UI when clicking outside the column
  useOnClickOutside(addColumnEl, () => {
    setIsAddingColumn(false);
  });

  const addColumn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newColumnTitle) {
      console.warn('No column title was provided');
      return;
    }

    ctx.addColumn({
      id: uuidv4(),
      title: newColumnTitle,
      weight: 0,
    });

    // reset add new column fields
    setIsAddingColumn(false);
    setNewColumnTitle('');
  };
  
  return (
    <>
      <VisuallyHidden as="h1">Trello Board</VisuallyHidden>

      <ul className={styles.columns}>
        {state.columns.map(column => {
          const cards = state.cards.filter(card => card.columnId === column.id);

          return (
            <li key={column.id}>
              <Column {...column}>
                {cards.map(card => (
                  <Card
                    key={card.id}
                    {...card}
                  />
                ))}
              </Column>
            </li>
          );
        })}

        <li
          ref={addColumnEl}
          className={columnStyles.root}
        >
          {isAddingColumn ? (
            <form onSubmit={addColumn}>
              <label>
                <VisuallyHidden as="span">Add new card title</VisuallyHidden>

                <input
                  type="text"
                  className={styles.newColumnTitle}
                  value={newColumnTitle}
                  onChange={event => setNewColumnTitle(event.target.value)}
                  placeholder="Enter list title…"
                  autoFocus
                />
              </label>

              <Button type="submit">
                Add list
              </Button>
            </form>
          ) : (
            <Button
              className={styles.toggleAdd}
              onClick={() => setIsAddingColumn(true)}
            >
              Add {Boolean(state.columns.length) ? 'another' : 'a'} list
            </Button>
          )}
        </li>
      </ul>
    </>
  );
};

export default Board;
