export interface Column {
  id: string;
  title: string;
  weight: number;
}

export type EditableColumnFields = Partial<Pick<Column, 'title' | 'weight'>>;
