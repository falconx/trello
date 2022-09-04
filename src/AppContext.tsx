import React, { createContext } from 'react';

import { GlobalState } from './types/GlobalState';
import { Column, EditableColumnFields } from './types/Column';
import { Card, EditableCardFields } from './types/Card';

import * as api from './api';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from './constants';

export interface GlobalAppContext {
  state: GlobalState;
  addCard: (value: Card) => void;
  removeCard: (cardId: string) => void;
  updateCard: (cardId: string, value: EditableCardFields) => void;
  addColumn: (value: Column) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (columnId: string, value: EditableColumnFields) => void;
  dragCard: (cardId: string) => void;
}

const defaultState: GlobalState = {
  columns: [],
  cards: [],
};

const noop = () => {};

const AppContext = createContext<GlobalAppContext>({
  state: defaultState,
  addCard: noop,
  removeCard: noop,
  updateCard: noop,
  addColumn: noop,
  removeColumn: noop,
  updateColumn: noop,
  dragCard: noop,
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

  const dragCard = (cardId: string) => {
    setState({
      ...state,
      activeDragCardId: cardId,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addCard: update.bind(null, api.addCard),
        removeCard: update.bind(null, api.removeCard),
        updateCard: update.bind(null, api.updateCard),
        addColumn: update.bind(null, api.addColumn),
        removeColumn: update.bind(null, api.removeColumn),
        updateColumn: update.bind(null, api.updateColumn),
        dragCard,
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
