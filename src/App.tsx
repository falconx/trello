import React from 'react';

import Board from './components/Board';

import { Card } from './types/Card';

import './App.module.css';

const cards: Card[] = [
  { id: '0', title: 'Example 1', weight: 0 },
  { id: '1', title: 'Example 2', weight: 1 },
];

const App: React.FunctionComponent = () => {
  return (
    <Board cards={cards} />
  );
}

export default App;
