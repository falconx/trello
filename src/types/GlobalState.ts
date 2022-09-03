import { Column as IColumn } from './Column';
import { Card as ICard } from './Card';

type CardsById = { [key: string]: ICard };

interface Column extends Omit<IColumn, 'cards'> {
  cardsById: CardsById;
}

type ColumnsById = { [key: string]: Column };

export interface GlobalState {
  columnsById: ColumnsById;
}
