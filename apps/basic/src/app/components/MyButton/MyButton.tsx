import { ButtonHTMLAttributes, forwardRef } from 'react';

export type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ children, isLoading = false, ...props }, ref) => (
    <button ref={ref} {...props}>
      {isLoading && <span>Loading...</span>}
      {children}
    </button>
  )
);
