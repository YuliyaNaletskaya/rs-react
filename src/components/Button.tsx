import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = '', ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={`custom-button ${className}`}>
      {children}
    </button>
  );
};
