import cloneDeep from 'lodash/cloneDeep';

import { GlobalState } from './types/GlobalState';
import { Card } from './types/Card';
import { Column } from './types/Column';

import * as api from './api';

const initialState: GlobalState = {
  columnsById: {
    'column-initial': {
      id: 'column-initial',
      title: 'Column 1',
      weight: 0,
      cardsById: {
        'card-initial': {
          id: 'card-initial',
          title: 'Card 1',
          weight: 0,
        },
      },
    },
  },
};

const setState = jest.fn();

describe('AppContext', () => {
  beforeEach(() => {
    // hide console warnings to clear up test logs
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('addCard', () => {
    const card: Card = {
      id: 'card-new',
      title: 'Card',
      weight: 0,
    };

    api.addCard(initialState, setState, 'column-initial', card);

    let nextState = cloneDeep(initialState);
    nextState.columnsById['column-initial'].cardsById['card-new'] = card;

    expect(setState).toBeCalledWith(nextState);
  });

  describe('removeCard', () => {
    it('correct removes the specified card', () => {
      api.removeCard(initialState, setState, 'column-initial', 'card-initial');

      let nextState = cloneDeep(initialState);
      delete nextState.columnsById['column-initial'].cardsById['card-initial'];

      expect(setState).toBeCalledWith(nextState);
    });

    it('does not update state when providing an invalid card ID', () => {
      const INVALID_CARD_ID = 'INVALID_CARD_ID';

      api.removeCard(initialState, setState, 'column-initial', INVALID_CARD_ID);

      expect(setState).not.toBeCalled();
    });
  });

  it('addColumn', () => {
    const column: Column = {
      id: 'column-new',
      title: 'Column',
      weight: 0,
      cardsById: {},
    };

    api.addColumn(initialState, setState, column);

    let nextState = cloneDeep(initialState);
    nextState.columnsById['column-new'] = column;

    expect(setState).toBeCalledWith(nextState);
  });

  it('removeColumn', () => {
    api.removeColumn(initialState, setState, 'column-initial');

    let nextState = cloneDeep(initialState);
    delete nextState.columnsById['column-initial'];

    expect(setState).toBeCalledWith(nextState);
  });

  describe('updateColumn', () => {
    const COLUMN_TITLE = 'COLUMN_TITLE';
    const COLUMN_WEIGHT = 100;

    it('correct updates the specified column', () => {
      api.updateColumn(initialState, setState, 'column-initial', {
        title: COLUMN_TITLE,
        weight: COLUMN_WEIGHT,
      });

      let nextState = cloneDeep(initialState);
      nextState.columnsById['column-initial'].title = COLUMN_TITLE;
      nextState.columnsById['column-initial'].weight = COLUMN_WEIGHT;

      expect(setState).toBeCalledWith(nextState);
    });

    it('does not update state when providing an invalid column ID', () => {
      const INVALID_COLUMN_ID = 'INVALID_COLUMN_ID';

      api.updateColumn(initialState, setState, INVALID_COLUMN_ID, {
        title: COLUMN_TITLE,
      });

      expect(setState).not.toBeCalled();
    });
  });
});

