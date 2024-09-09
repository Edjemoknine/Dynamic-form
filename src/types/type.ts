import { Path, UseFormRegister } from "react-hook-form";

export interface IFormValues {
  Firstname: string;
  Age: number;
  Lastname: string;
  Password: string;
  Email: string;
}

export type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  type: string;
  errors: any;
};
