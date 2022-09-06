export interface Card {
  id: string;
  columnId: string;
  title: string;
  description?: string;
}

export type EditableCardFields = Partial<Omit<Card, 'id'>>;
