import React, { createContext } from 'react';

import { GlobalState } from './types/GlobalState';
import { Column } from './types/Column';
import { Card } from './types/Card';

import * as api from './api';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from './constants';

export interface GlobalAppContext {
  state: GlobalState;
  updateColumn: (columnId: string, value: Partial<Pick<Column, 'title' | 'weight'>>) => void;
  addCard: (columnId: string, value: Card) => void;
  removeCard: (columnId: string, cardId: string) => void;
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

const AppConsumer = AppContext.Consumer;

interface Props {
  children?: React.ReactNode;
}

const AppProvider: React.FunctionComponent<Props> = props => {
  const [state, setState] = useLocalStorage<GlobalState>(LOCAL_STORAGE_KEY, defaultState);

  const updateColumn = api.updateColumn.bind(null, state, setState);
  const addCard = api.addCard.bind(null, state, setState);
  const removeCard = api.removeCard.bind(null, state, setState);
  const addColumn = api.addColumn.bind(null, state, setState);
  const removeColumn = api.removeColumn.bind(null, state, setState);

  return (
    <AppContext.Provider
      value={{
        state,
        updateColumn,
        addCard,
        removeCard,
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
  AppConsumer,
};
