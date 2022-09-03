import React, { createContext } from 'react';

import { GlobalState } from './types/GlobalState';
import { Column } from './types/Column';
import { Card } from './types/Card';

import useLocalStorage from './hooks/useLocalStorage';

interface GlobalAppContext {
  state: GlobalState;
  updateColumn: (columnId: string, value: Partial<Column>) => void;
  addCard: (columnId: string, value: Card) => void;
  addColumn: (value: Column) => void;
  removeColumn: (columnId: string) => void;
}

const defaultState = {
  columnsById: {
    '0': {
      id: '0',
      title: 'Column 1',
      weight: 0,
      cardsById: {
        '0': { id: '0', title: 'Example 1', weight: 0 },
        '1': { id: '1', title: 'Example 2', weight: 1 },
      },
    },
    '1': {
      id: '1',
      title: 'Column 2',
      weight: 1,
      cardsById: {
        '0': { id: '0', title: 'Example 1', weight: 0 },
      },
    },
  },
};

const AppContext = createContext<GlobalAppContext | null>(null);

interface Props {
  children?: React.ReactNode;
}

const AppProvider: React.FunctionComponent<Props> = props => {
  const [state, setState] = useLocalStorage<GlobalState>('trello', defaultState);

  /**
   * Allows for partial column updates
   * 
   * @param columnId The ID of the column
   * @param value The values to override the column with
   */
  const updateColumn = (columnId: string, value: Partial<Column>): void => {
    if (!state.columnsById[columnId]) {
      console.warn('cannot update missing column', columnId);
    }

    setState({
      ...state,
      columnsById: {
        ...state.columnsById,
        [columnId]: {
          ...state.columnsById[columnId],
          ...value,
        },
      },
    });
  };

  const addCard = (columnId: string, value: Card): void => {
    setState({
      ...state,
      columnsById: {
        ...state.columnsById,
        [columnId]: {
          ...state.columnsById[columnId],
          cardsById: {
            ...state.columnsById[columnId].cardsById,
            [value.id]: value,
          },
        },
      },
    });
  };

  const addColumn = (value: Column): void => {
    setState({
      ...state,
      columnsById: {
        ...state.columnsById,
        [value.id]: value,
      },
    });
  };

  const removeColumn = (columnId: string) => {
    const nextColumns = Object.assign({}, state.columnsById);
    delete nextColumns[columnId];

    setState({
      ...state,
      columnsById: nextColumns,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateColumn,
        addCard,
        addColumn,
        removeColumn,
      }}
      {...props}
    />
  )
};

export {
  AppContext,
  AppProvider,
};
