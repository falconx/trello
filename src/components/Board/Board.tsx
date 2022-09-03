import VisuallyHidden from '../VisuallyHidden';
import Card from '../Card';
import Column from '../Column';

import { Column as IColumn } from '../../types/Column';

import styles from './Board.module.css';

interface Props {
  columns?: IColumn[];
}

const Board: React.FunctionComponent<Props> = ({ columns = [] }) => (
  <>
    <VisuallyHidden as="h1">Trello Board</VisuallyHidden>

    {Boolean(columns.length) && (
      <ul className={styles.columns}>
        {columns.map(column => (
          <li key={column.id}>
            <Column {...column}>
              {column.cards.map(card => (
                <Card key={card.id} {...card} />
              ))}
            </Column>
          </li>
        ))}
      </ul>
    )}
  </>
);

export default Board;
