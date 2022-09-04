export interface Card {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  weight: number;
}

export type EditableCardFields = Partial<Pick<Card, 'title' | 'description' | 'weight'>>;
