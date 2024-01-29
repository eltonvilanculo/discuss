"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface IFormButton extends ButtonProps {
  children: React.ReactNode;
}
export default function FormButton({ children, ...rest }: IFormButton) {
  const { pending } = useFormStatus(); //pega o estado de form, nao pode ser criado onde esta o formulario e pega o parent

  return (
    <Button
      type="submit"
      isLoading={pending}
      {...rest}
      className="w-full bg-black text-white rounded-sm"
    >
      {children}
    </Button>
  );
}
