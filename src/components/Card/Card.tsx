import React, { useContext, useState } from 'react';

import { AppContext } from '../../AppContext';
import EditModal from '../EditModal';
import Button, { Variant as ButtonVariant } from '../Button';

import { Card as ICard } from '../../types/Card';

import styles from './Card.module.css';

export type Props = ICard;

const Card: React.FunctionComponent<Props> = props => {
  const ctx = useContext(AppContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const { id: cardId, title, description } = props;

  return (
    <>
      <div
        className={styles.root}
        onClick={() => setShowEditModal(true)}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          <Button
            variant={ButtonVariant.Secondary}
            onClick={event => {
              // prevent the outer, non-focusable element, click handler being fired
              event.stopPropagation();

              setShowEditModal(true);
            }}
          >Edit</Button>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {showEditModal && (
        <EditModal
          {...props}
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
