import { useContext } from 'react';

import { AppContext } from '../../AppContext';
import VisuallyHidden from '../VisuallyHidden';
import Card from '../Card';
import Column from '../Column';

import styles from './Board.module.css';

const Board: React.FunctionComponent = () => {
  const ctx = useContext(AppContext);

  const columns = Object.values(ctx?.state.columnsById || {});
  
  return (
    <>
      <VisuallyHidden as="h1">Trello Board</VisuallyHidden>

      {Boolean(columns.length) && (
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
        </ul>
      )}
    </>
  );
};

export default Board;
