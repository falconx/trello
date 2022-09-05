import React, { createContext, useState } from 'react';

import { GlobalState } from './types/GlobalState';
import { Column, EditableColumnFields } from './types/Column';
import { Card, EditableCardFields } from './types/Card';

import * as api from './api';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from './constants';

export interface GlobalAppContext {
  state: GlobalState;
  activeDragCardId: string | null;
  dragCard: (cardId: string) => void;
  addCard: (value: Card) => void;
  removeCard: (cardId: string) => void;
  updateCard: (cardId: string, value: EditableCardFields) => void;
  addColumn: (value: Column) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (columnId: string, value: EditableColumnFields) => void;
}

const defaultState: GlobalState = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
    },
    {
      id: 'done',
      title: 'Done',
    },
  ],
  cards: [
    {
      id: 'card-0',
      columnId: 'done',
      title: 'Make breakfast',
      description: `In order to make breakfast you'll need the following ingredients:\n\n* Eggs\n* Sausages\n* Beans\n* Hash browns\n* Toast`,
    },
    {
      id: 'card-1',
      columnId: 'todo',
      title: 'Check mail',
    },
    {
      id: 'card-2',
      columnId: 'todo',
      title: 'Get to work',
    },
  ],
};

const noop = () => {};

const AppContext = createContext<GlobalAppContext>({
  state: defaultState,
  activeDragCardId: null,
  dragCard: noop,
  addCard: noop,
  removeCard: noop,
  updateCard: noop,
  addColumn: noop,
  removeColumn: noop,
  updateColumn: noop,
});

const AppConsumer = AppContext.Consumer;

interface Props {
  children?: React.ReactNode;
}

const AppProvider: React.FunctionComponent<Props> = props => {
  const [state, setState] = useLocalStorage<GlobalState>(LOCAL_STORAGE_KEY, defaultState);
  const [activeDragCardId, setActiveDragCardId] = useState<string | null>(null);

  // TODO: opted for conciseness here but type safety could be improved
  // by ensuring the context and api function signatures are matched
  const update = (fn: Function, ...args: any) => setState(fn(state, ...args));

  return (
    <AppContext.Provider
      value={{
        state,
        activeDragCardId,
        dragCard: setActiveDragCardId,
        addCard: update.bind(null, api.addCard),
        removeCard: update.bind(null, api.removeCard),
        updateCard: update.bind(null, api.updateCard),
        addColumn: update.bind(null, api.addColumn),
        removeColumn: update.bind(null, api.removeColumn),
        updateColumn: update.bind(null, api.updateColumn),
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
