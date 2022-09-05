import { Column } from './Column';
import { Card } from './Card';

export interface StoredGlobalStage {
  columns: Column[];
  cards: Card[];
}

export interface GlobalState extends StoredGlobalStage {
  activeDragCardId?: string;
}
