import cloneDeep from 'lodash/cloneDeep';

import { GlobalState } from './types/GlobalState';
import { Card } from './types/Card';
import { Column } from './types/Column';

import * as api from './api';

const initialState: GlobalState = {
  columns: [
    {
      id: 'column-initial-1',
      title: 'Column 1',
      weight: 0,
    },
  ],
  cards: [
    {
      id: 'card-initial-1',
      columnId: 'column-initial-1',
      title: 'Card 1',
      weight: 0,
    },
    {
      id: 'card-initial-2',
      columnId: 'column-initial-1',
      title: 'Card 2',
      weight: 1,
    },
  ],
};

describe('AppContext', () => {
  beforeEach(() => {
    // hide console warnings to clear up test logs
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('addCard', () => {
    const card: Card = {
      id: 'card-new',
      columnId: 'column-initial-1',
      title: 'Card',
      weight: 0,
    };

    const response = api.addCard(initialState, card);

    const nextState = cloneDeep(initialState);
    nextState.cards.push(card);

    expect(initialState.cards.length).toBe(2);
    expect(response.cards.length).toBe(3);
    expect(response).toMatchObject(nextState);
  });

  describe('removeCard', () => {
    it('removes the specified card', () => {
      const response = api.removeCard(initialState, 'card-initial-1');

      const nextState = cloneDeep(initialState);
      nextState.cards = nextState.cards.filter(card => card.id !== 'card-initial-1');

      expect(initialState.cards.length).toBe(2);
      expect(response.cards.length).toBe(1);
      expect(response).toMatchObject(nextState);
    });

    it('does not update state when providing an invalid card ID', () => {
      const INVALID_CARD_ID = 'INVALID_CARD_ID';

      const response = api.removeCard(initialState, INVALID_CARD_ID);

      expect(response).toBe(initialState);
    });
  });

  it('addColumn', () => {
    const column: Column = {
      id: 'column-new',
      title: 'Column',
      weight: 0,
    };

    const response = api.addColumn(initialState, column);

    const nextState = cloneDeep(initialState);
    nextState.columns.push(column);

    expect(initialState.columns.length).toBe(1);
    expect(response.columns.length).toBe(2);
    expect(response).toMatchObject(nextState);
  });

  describe('removeColumn', () => {
    it('removes only the specified column', () => {
      const response = api.removeColumn(initialState, 'column-initial-1');

      const nextState = cloneDeep(initialState);
      const nextColumns = nextState.columns.filter(column => column.id !== 'column-initial-1');

      expect(initialState.columns.length).toBe(1);
      expect(response.columns.length).toBe(0);
      expect(response).toMatchObject(expect.objectContaining({
        columns: nextColumns,
      }));
    });

    // TODO: improve test by having multiple columns to ensure cards from other columns are not removed
    it('removes all associated cards', () => {
      const response = api.removeColumn(initialState, 'column-initial-1');

      const nextState = cloneDeep(initialState);
      const nextCards = nextState.cards.filter(card => card.columnId !== 'column-initial-1');
    
      expect(initialState.cards.length).toBe(2);
      expect(response.cards.length).toBe(0);
      expect(response).toMatchObject(expect.objectContaining({
        cards: nextCards,
      }));
    });
  });

  describe('updateColumn', () => {
    const NEW_COLUMN_TITLE = 'NEW_COLUMN_TITLE';
    const NEW_COLUMN_WEIGHT = 100;

    it('updates the specified column', () => {
      const response = api.updateColumn(initialState, 'column-initial-1', {
        title: NEW_COLUMN_TITLE,
        weight: NEW_COLUMN_WEIGHT,
      });

      const nextState = cloneDeep(initialState);

      let column = nextState.columns.find(column => column.id === 'column-initial-1') as Column;
      column.title = NEW_COLUMN_TITLE;
      column.weight = NEW_COLUMN_WEIGHT;

      expect(response).toMatchObject(nextState);
    });

    it('does not update state when providing an invalid column ID', () => {
      const INVALID_COLUMN_ID = 'INVALID_COLUMN_ID';

      const response = api.updateColumn(initialState, INVALID_COLUMN_ID, {
        title: NEW_COLUMN_TITLE,
      });

      expect(response).toBe(initialState);
    });
  });
});

