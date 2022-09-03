import VisuallyHidden from '../VisuallyHidden';
import Card from '../Card';
import Column from '../Column';

import { Card as ICard } from '../../types/Card';

import styles from './Board.module.css';

interface Props {
  cards?: ICard[];
}

const Board: React.FunctionComponent<Props> = ({ cards = [] }) => (
  <>
    <VisuallyHidden as="h1">Trello Board</VisuallyHidden>

    <div className={styles.root}>
      <Column id="0" title="Example Column" weight={0}>
        {cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </Column>

      <Column id="1" title="Example Column" weight={0}>
        {cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </Column>
    </div>
  </>
);

export default Board;
