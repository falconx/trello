import VisuallyHidden from '../VisuallyHidden';

import styles from './Input.module.css';

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FunctionComponent<Props> = ({ label, ...props }) => (
  <label>
    <VisuallyHidden as="span">{label}</VisuallyHidden>

    <input
      className={styles.root}
      type="text"
      {...props}
    />
  </label>
);

export default Input;
