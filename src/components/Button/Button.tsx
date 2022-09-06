import styles from './Button.module.css';

// maps variant prop to class name
export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
  Remove = 'remove',
}

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<Props> = ({
  variant = Variant.Primary,
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={styles[variant]}
  />
);


export default Button;
