import { Card as ICard } from '../../types/Card';

import styles from './Card.module.css';

export type Props = ICard & {
  children?: React.ReactNode;
};

const Card: React.FunctionComponent<Props> = ({ title, children }) => (
  <div className={styles.root}>
    <h3>{title}</h3>

    {children}
  </div>
);

export default Card;
