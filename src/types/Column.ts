export interface Column {
  id: string;
  title: string;
}

export type EditableColumnFields = Partial<Pick<Column, 'title'>>;
