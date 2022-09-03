import styles from './Button.module.css';

type Props = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<Props> = props => (
  <button
    type="button"
    {...props}
    className={styles.root}
  />
);

export default Button;
