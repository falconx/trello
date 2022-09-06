import * as React from 'react';

import styles from './VisuallyHidden.module.css';

export interface VisuallyHiddenProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

// https://itnext.io/react-polymorphic-components-with-typescript-f7ce72ea7af2
const VisuallyHidden = <T extends React.ElementType = 'div'>({ as, ...props }: VisuallyHiddenProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof VisuallyHiddenProps<T>>) => {
  const Component = as || 'div';

  return <Component {...props} className={styles.root} />;
};

export default VisuallyHidden;
