import React, { useContext, useState } from 'react';

import { AppContext } from '../../AppContext';
import Modal from '../Modal';
import Button, { Variant as ButtonVariant } from '../Button';

import { Card as ICard } from '../../types/Card';

import styles from './Card.module.css';

export type Props = ICard & {
  columnId: string;
  children?: React.ReactNode;
};

const Card: React.FunctionComponent<Props> = ({ columnId, id: cardId, title, children }) => {
  const ctx = useContext(AppContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addNewTitle, setEditNewTitle] = useState('');

  return (
    <>
      <div
        className={styles.root}
        onClick={() => setShowEditModal(true)}
      >
        <h3>{title}</h3>

        <button
          className={styles.edit}
          onClick={event => {
            event.stopPropagation();

            setShowEditModal(true);
          }}
        >Edit</button>

        {children}
      </div>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <h2>{title}</h2>

          <form>
            <label>
              <input
                type="text"
                value={addNewTitle}
                onChange={event => setEditNewTitle(event.target.value)}
              />
            </label>

            <button type="submit" />
          </form>

          <Button
            variant={ButtonVariant.Remove}
            onClick={() => ctx?.removeCard(columnId, cardId)}
          >Remove card</Button>
        </Modal>
      )}
    </>
  );
};

export default Card;
