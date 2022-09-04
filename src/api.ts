import cloneDeep from 'lodash/cloneDeep';

import { GlobalState } from './types/GlobalState';
import { Column, EditableColumnFields } from './types/Column';
import { Card, EditableCardFields } from './types/Card';

/**
 * Adds a card to state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param value The card to add
 */
export const addCard = (
  state: GlobalState,
  value: Card
): GlobalState => {
  return {
    ...state,
    cards: [...state.cards, value],
  };
};

/**
 * Removes the specified card from state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param cardId ID of the card to remove
 */
export const removeCard = (
  state: GlobalState,
  cardId: string
): GlobalState => {
  const nextCards = cloneDeep(state.cards).filter(card => card.id !== cardId);

  if (state.cards.length === nextCards.length) {
    console.warn('card was not removed as it could not be found');
    return state;
  }

  return {
    ...state,
    cards: nextCards,
  };
};

/**
 * Adds a column to state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param value The column to add
 */
export const addColumn = (
  state: GlobalState,
  value: Column
): GlobalState => {
  return {
    ...state,
    columns: [...state.columns, value],
  };
};

/**
 * Removes the specified column from state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param columnId ID of the column to remove
 */
export const removeColumn = (
  state: GlobalState,
  columnId: string
): GlobalState => {
  const nextState = cloneDeep(state);
  const nextColumns = nextState.columns.filter(column => column.id !== columnId);

  if (state.columns.length === nextColumns.length) {
    console.warn('column was not removed as it could not be found', columnId);
    return state;
  }

  const nextCards = nextState.cards.filter(card => card.columnId !== columnId);

  return {
    ...state,
    columns: nextColumns,
    cards: nextCards,
  };
};

/**
 * Allows for partial column updates
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param columnId The ID of the column
 * @param value The values to override the column with
 */
export const updateColumn = (
  state: GlobalState,
  columnId: string,
  value: EditableColumnFields
): GlobalState => {
  const nextColumns = cloneDeep(state.columns);

  let columnIndex = nextColumns.findIndex(column => column.id === columnId);

  if (columnIndex === -1) {
    console.warn('cannot update missing column', columnId);
    return state;
  }

  nextColumns[columnIndex] = {
    ...nextColumns[columnIndex],
    ...value,
  };

  return {
    ...state,
    columns: nextColumns,
  };
};

/**
 * Allows for partial card updates
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param cardId The ID of the card
 * @param value The values to override the card with
 */
export const updateCard = (
  state: GlobalState,
  cardId: string,
  value: EditableCardFields
): GlobalState => {
  const nextCards = cloneDeep(state.cards);

  let cardIndex = nextCards.findIndex(card => card.id === cardId);

  if (cardIndex === -1) {
    console.warn('cannot update missing card', cardId);
    return state;
  }

  nextCards[cardIndex] = {
    ...nextCards[cardIndex],
    ...value,
  };

  return {
    ...state,
    cards: nextCards,
  };
};
