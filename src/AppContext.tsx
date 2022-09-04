import React, { createContext } from 'react';

import { GlobalState } from './types/GlobalState';
import { Column } from './types/Column';
import { Card } from './types/Card';

import * as api from './api';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from './constants';

type UpdateColumnValue = Partial<Pick<Column, 'title' | 'weight'>>;

export interface GlobalAppContext {
  state: GlobalState;
  updateColumn: (columnId: string, value: UpdateColumnValue) => void;
  addCard: (value: Card) => void;
  removeCard: (cardId: string) => void;
  addColumn: (value: Column) => void;
  removeColumn: (columnId: string) => void;
}

const defaultState: GlobalState = {
  columns: [],
  cards: [],
};

const noop = () => {};

const AppContext = createContext<GlobalAppContext>({
  state: defaultState,
  updateColumn: noop,
  addCard: noop,
  removeCard: noop,
  addColumn: noop,
  removeColumn: noop,
});

const AppConsumer = AppContext.Consumer;

interface Props {
  children?: React.ReactNode;
}

const AppProvider: React.FunctionComponent<Props> = props => {
  const [state, setState] = useLocalStorage<GlobalState>(LOCAL_STORAGE_KEY, defaultState);

  // TODO: opted for conciseness here but type safety could be improved
  // by ensuring the context and api function signatures are matched
  const update = (fn: Function, ...args: any) => setState(fn(state, ...args));

  return (
    <AppContext.Provider
      value={{
        state,
        updateColumn: update.bind(null, api.updateColumn),
        addCard: update.bind(null, api.addCard),
        removeCard: update.bind(null, api.removeCard),
        addColumn: update.bind(null, api.addColumn),
        removeColumn: update.bind(null, api.removeColumn),
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
