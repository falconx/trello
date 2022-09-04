import React, { useContext, useState } from 'react';

import { AppContext } from '../../AppContext';
import EditModal from '../EditModal';

import { Card as ICard } from '../../types/Card';

import styles from './Card.module.css';

export type Props = ICard & {
  children?: React.ReactNode;
};

const Card: React.FunctionComponent<Props> = ({ id: cardId, title, description, children }) => {
  const ctx = useContext(AppContext);
  const [showEditModal, setShowEditModal] = useState(false);

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
            // prevent the outer, non-focusable element, click handler being fired
            event.stopPropagation();

            setShowEditModal(true);
          }}
        >Edit</button>

        {children}
      </div>

      {showEditModal && (
        <EditModal
          title={title}
          description={description}
          onClose={() => setShowEditModal(false)}
          onRemoveCard={() => ctx.removeCard(cardId)}
          onUpdate={value => {
            ctx.updateCard(cardId, value);
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

export default Card;
