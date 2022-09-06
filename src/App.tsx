import React from 'react';

import { AppProvider } from './AppContext';
import Board from './components/Board';

import './App.module.css';

const App: React.FunctionComponent = () => (
  <AppProvider>
    <main>
      <Board />
    </main>

    <div id="modal-root" />
  </AppProvider>
);

export default App;
