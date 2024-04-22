import React from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
  submit: (data: FieldValues) => void;
};
const Form = ({ children, handleSubmit, submit }: Props) => {
  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      {children}
    </form>
  );
};

export default Form;
