import VisuallyHidden from '../VisuallyHidden';

import styles from './EditableTitleField.module.css';

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const EditableTitleField: React.FunctionComponent<Props> = ({ label, ...props }) => (
  <label className={styles.root}>
    <svg
      enableBackground="new 0 0 528.899 528.899"
      version="1.1"
      viewBox="0 0 528.9 528.9"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      <path d="m328.88 89.125 107.59 107.59-272.34 272.34-107.53-107.59 272.28-272.34zm189.23-25.948-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zm-517.81 449.51c-1.958 8.812 5.998 16.708 14.811 14.565l119.89-29.069-107.53-107.59-27.173 122.09z" fill="currentColor" />
    </svg>

    <VisuallyHidden as="span">{label}</VisuallyHidden>

    <input
      {...props}
      className={styles.input}
    />
  </label>
);

export default EditableTitleField;
