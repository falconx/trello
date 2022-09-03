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
  const ctx = useContext(AppContext);
  const addColumnEl = useRef<HTMLLIElement>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const columns = Object.values(ctx?.state.columnsById || {});

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

    ctx?.addColumn({
      id: uuidv4(),
      title: newColumnTitle,
      weight: 0,
      cardsById: {},
    });

    // reset add new column fields
    setIsAddingColumn(false);
    setNewColumnTitle('');
  };
  
  return (
    <>
      <VisuallyHidden as="h1">Trello Board</VisuallyHidden>

      <ul className={styles.columns}>
        {columns.map(column => (
          <li key={column.id}>
            <Column {...column}>
              {Object.values(column.cardsById).map(card => (
                <Card key={card.id} {...card} />
              ))}
            </Column>
          </li>
        ))}

        <li
          ref={addColumnEl}
          className={columnStyles.root}
        >
          {isAddingColumn ? (
            <form onSubmit={addColumn}>
              <label>
                <VisuallyHidden as="span">Add new card title</VisuallyHidden>

                <textarea
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
              Add another list
            </Button>
          )}
        </li>
      </ul>
    </>
  );
};

export default Board;
