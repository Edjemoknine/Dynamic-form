import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";

type formFieldProps = {
  username: string;
  email: string;
  password: string;
  phoneNumbers: { number: string }[];
};
const UseFormArray = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formFieldProps>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phoneNumbers: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  const onSubmit = (data: formFieldProps) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 border rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <input
          {...register("username", {
            required: "Username is required",
          })}
          placeholder="John doe"
          className="border rounded p-2"
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username?.message}</p>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format  Ex: ---> example@gmail.com",
            },
          })}
          className="border rounded p-2"
          type="email"
          placeholder="exampl@gmail.com"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email?.message}</p>
        )}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
          className="border rounded p-2"
          placeholder="**********"
          type="password"
        />{" "}
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password?.message}</p>
        )}
        {/* multi fields */}
        <div className="flex w-full gap-6">
          <div className="w-full">
            {fields.map((field, idx) => (
              <div key={field.id} className="w-full flex">
                <div className="w-full">
                  <input
                    {...register(`phoneNumbers.${idx}.number`, {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+\d{1,3}\s?\d{1,14}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    placeholder="Phone number"
                    className="border rounded p-2 w-full mb-3"
                    type="tel"
                  />
                  {/* {
                    <p className="text-xs text-red-500">
                      {errors?.phoneNumbers?.message}
                    </p>
                  } */}
                </div>
                {idx > 0 && (
                  <Button
                    className="ml-3"
                    variant={"destructive"}
                    onClick={() => remove(idx)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button className="" onClick={() => append({ number: "" })}>
            Add Phone number
          </Button>
        </div>
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

export default UseFormArray;
