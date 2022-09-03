import { GlobalState } from "./types/GlobalState";
import { Column } from "./types/Column";
import { Card } from "./types/Card";

/**
 * Adds a card to state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param columnId The ID of the column that the card belongs to
 * @param value The card to add
 */
export const addCard = (
  state: GlobalState,
  setState: (state: GlobalState) => void,
  columnId: string,
  value: Card
): void => {
  setState({
    ...state,
    columnsById: {
      ...state.columnsById,
      [columnId]: {
        ...state.columnsById[columnId],
        cardsById: {
          ...state.columnsById[columnId].cardsById,
          [value.id]: value,
        },
      },
    },
  });
};

/**
 * Removes the specified card from state
 *
 * @param state Global state
 * @param setState Fn to set state
 * @param columnId ID of the column to remove
 * @param cardId ID of the card to remove
 */
export const removeCard = (
  state: GlobalState,
  setState: (state: GlobalState) => void,
  columnId: string,
  cardId: string
): void => {
  const column = state.columnsById[columnId];
  const card = column?.cardsById?.[cardId];

  if (!card) {
    console.warn('card was not removed as it could not be found');
    return;
  }

  const nextCards = Object.assign({}, column.cardsById);
  delete nextCards[cardId];

  setState({
    ...state,
    columnsById: {
      ...state.columnsById,
      [columnId]: {
        ...state.columnsById[columnId],
        cardsById: nextCards,
      },
    },
  });
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
  setState: (state: GlobalState) => void,
  value: Column
): void => {
  setState({
    ...state,
    columnsById: {
      ...(state.columnsById || {}),
      [value.id]: value,
    },
  });
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
  setState: (state: GlobalState) => void,
  columnId: string
): void => {
  const nextColumns = Object.assign({}, state.columnsById);
  delete nextColumns[columnId];

  setState({
    ...state,
    columnsById: nextColumns,
  });
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
  setState: (state: GlobalState) => void,
  columnId: string,
  value: Partial<Pick<Column, 'title' | 'weight'>>
): void => {
  if (!state.columnsById[columnId]) {
    console.warn("cannot update missing column", columnId);
    return;
  }

  setState({
    ...state,
    columnsById: {
      ...state.columnsById,
      [columnId]: {
        ...state.columnsById[columnId],
        ...value,
      },
    },
  });
};
