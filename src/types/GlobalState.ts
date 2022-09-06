import { Column } from './Column';
import { Card } from './Card';

export interface GlobalState {
  columns: Column[];
  cards: Card[];
  activeDragCardId?: string;
}
