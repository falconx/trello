import { Card } from './Card';

export interface Column {
  id: string;
  title: string;
  weight: number;
  cards: Card[];
}
