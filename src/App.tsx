import React, { useEffect } from 'react';

import Board from './components/Board';

import { GlobalState } from './types/GlobalState';

import './App.module.css';
import useLocalStorage from './hooks/useLocalStorage';

const defaultState = {
  columns: [
    {
      id: '0',
      title: 'Column 1',
      weight: 0,
      cards: [
        { id: '0', title: 'Example 1', weight: 0 },
        { id: '1', title: 'Example 2', weight: 1 },
      ],
    },
    {
      id: '1',
      title: 'Column 2',
      weight: 1,
      cards: [
        { id: '0', title: 'Example 1', weight: 0 },
      ],
    },
  ],
};

const App: React.FunctionComponent = () => {
  const [state, setState] = useLocalStorage<GlobalState>('trello', defaultState);

  // TODO: temporary, remove
  useEffect(() => {
    setState(state);
  }, [state, setState]);

  return (
    <Board columns={state.columns} />
  );
}

export default App;
