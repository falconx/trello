import { useState } from 'react';

import { Card as ICard } from '../../types/Card';

import Modal from '../Modal';

import styles from './Card.module.css';

export type Props = ICard & {
  children?: React.ReactNode;
};

const Card: React.FunctionComponent<Props> = ({ title, children }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [addNewTitle, setEditNewTitle] = useState('');

  return (
    <>
      <div className={styles.root}>
        <h3>{title}</h3>

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
        </Modal>
      )}
    </>
  );
};

export default Card;
