/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";

const DynamicForm = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onchangeField = (e: any) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  type FieldProps = {
    rule: string;
    grad: string;
  };
  // Multiple fields state
  const [subEmploye, setsubEmploye] = useState<FieldProps[]>([
    { rule: "", grad: "" },
  ]);

  // Multiple fields handlers
  const EmpolChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    console.log(e.target.name, e.target.value, idx);
    const values = [...subEmploye];
    values[idx][e.target.name as keyof FieldProps] = e.target.value;
    setsubEmploye(values);
  };

  const handleAddSubEmploye = () => {
    const newEmployee = { rule: "", grad: "" };
    setsubEmploye([...subEmploye, newEmployee]);
  };
  const removeSubEmploye = (idx: number) => {
    const data = [...subEmploye];
    data.splice(idx, 1);
    setsubEmploye(data);
  };

  const onSubmit = (data: { preventDefault: () => void }) => {
    data.preventDefault();
    console.log(subEmploye);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 border rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <input
          placeholder="John doe"
          onChange={onchangeField}
          className="border rounded p-2"
        />

        <input
          className="border rounded p-2"
          onChange={onchangeField}
          type="email"
          placeholder="exampl@gmail.com"
        />

        <input
          className="border rounded p-2"
          onChange={onchangeField}
          placeholder="**********"
          type="password"
        />

        <div className="flex items-center justify-between">
          <p className="font-semibold">Add your roles is there any :</p>
          <Button onClick={handleAddSubEmploye} className="ml-4 " size={"icon"}>
            +
          </Button>
        </div>
        {subEmploye.map((employee, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="border rounded p-2 flex-1"
              placeholder="Ex: Frontend .... "
              type="text"
              name="rule"
              value={employee.rule}
              onChange={(e) => EmpolChange(e, idx)}
            />
            <input
              className="border rounded p-2 flex-1"
              placeholder="Ex: Junior .... "
              type="text"
              name="grad"
              value={employee.grad}
              onChange={(e) => EmpolChange(e, idx)}
            />
            {idx > 0 && (
              <Button
                onClick={() => removeSubEmploye(idx)}
                variant={"destructive"}
                className="ml-4 "
                size={"icon"}
              >
                -
              </Button>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-primary p-2 text-white w-fit px-8 rounded-lg hover:bg-primary/90"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default DynamicForm;
