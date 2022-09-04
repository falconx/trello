import { useState } from 'react';
import Modal from '../Modal';
import Button, { Variant as ButtonVariant } from '../Button';

import { Card } from '../../types/Card';

import styles from './EditModal.module.css';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
  title: string;
  description?: string;
  onClose: () => void;
  onRemoveCard: () => void;
  onUpdate: (card: Partial<Card>) => void;
}

interface FormFields {
  title?: string;
  description?: string;
}

const EditModal: React.FunctionComponent<Props> = ({
  title,
  description = '',
  onClose,
  onRemoveCard,
  onUpdate,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const getDirtyValues = (): FormFields => {
    let dirtyFields: FormFields = {};

    if (title !== newTitle) {
      dirtyFields.title = newTitle;
    }

    if (description !== newDescription) {
      dirtyFields.description = newDescription;
    }

    return dirtyFields;
  };

  return (
    <Modal onClose={onClose}>
      <VisuallyHidden as="h2">{title}</VisuallyHidden>

      <div className={styles.stack}>
        <div className={styles.header}>
          <label>
            <input
              type="text"
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
              className={styles.title}
              required
            />
          </label>

          <Button
            variant={ButtonVariant.Secondary}
            onClick={onClose}
          >Close</Button>
        </div>

        <form
          className={styles.stack}
          onSubmit={event => {
            event.preventDefault();

            const dirtyValues = getDirtyValues();
            onUpdate(dirtyValues);
          }}
        >
          <div className={styles.content}>
            <div className={styles.left}>
              <label className={styles.label}>
                Description:

                <textarea
                  value={newDescription}
                  onChange={event => setNewDescription(event.target.value)}
                  className={styles.description}
                />
              </label>
            </div>

            <div className={styles.right}>
              <Button
                variant={ButtonVariant.Remove}
                onClick={onRemoveCard}
              >Remove card</Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!newTitle.length}
          >Update card</Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
