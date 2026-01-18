import React from 'react';
import { openContact } from '../stores/contactStore';
import Button from './Button';

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ children, className }) => {
  return (
    <Button onClick={openContact} className={className}>
      {children}
    </Button>
  );
};

export default CTAButton;
