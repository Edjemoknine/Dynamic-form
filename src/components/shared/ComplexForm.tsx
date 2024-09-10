/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useFieldArray, useForm } from "react-hook-form";

const schema = z
  .object({
    firstName: z.string().min(2, { message: "firstName is requierd" }),
    lastName: z.string().min(2, { message: "lastname is requierd" }),
    middleName: z
      .string()
      .min(2, { message: "middlename is requierd" })
      .optional(),
    hasMidname: z.boolean().optional(),
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().min(10, { message: "Invalid phone number" }),
    address: z.object({
      street: z.string().min(2, { message: "Street is required" }),
      city: z.string().min(2, { message: "City is required" }),
      state: z.string().min(2, { message: "State is required" }),
    }),
    hobbies: z
      .array(
        z.object({
          name: z.string().min(2, { message: "Hobby name is required" }),
        })
      )
      .min(1, { message: "At least one hobby is required" }),
    password: z.string().min(8, { message: "Password is required" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ComplexForm = () => {
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error: any) {
      console.log({ error });
      setError("root", error?.message);
    }
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  console.log(errors.root);

  return (
    <div className="p-6 border rounded-lg max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className=" flex flex-col gap-1">
          <label htmlFor="firstName">First Name:</label>
          <input
            className=" border rounded p-2"
            type="text"
            id="firstName"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors?.firstName?.message}</p>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className=" border rounded p-2"
            type="text"
            id="lastName"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors?.lastName?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="middleName">Has Middle Name </label>
          <input
            type="checkbox"
            className="cursor-pointer"
            {...register("hasMidname")}
          />
        </div>
        {watch("hasMidname") && (
          <div className=" flex flex-col gap-1">
            <input
              className=" border rounded p-2"
              type="text"
              placeholder="Middle Name"
              {...register("middleName")}
            />
            {errors.middleName && (
              <p className="text-sm text-red-500">
                {errors?.middleName?.message}
              </p>
            )}
          </div>
        )}
        <div className=" flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            className=" border rounded p-2"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className=" border rounded p-2"
            type="tel"
            id="phone"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors?.phone?.message}</p>
          )}
        </div>

        <div className=" flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            className=" border rounded p-2"
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            className=" border rounded p-2"
            type="password"
            id="confirm"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors?.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className=" flex flex-col gap-1">
            <label htmlFor="city">City:</label>
            <input
              className=" border rounded p-2"
              type="text"
              id="city"
              {...register("address.city")}
            />
            {errors.address?.city && (
              <p className="text-sm text-red-500">
                {errors?.address?.city?.message}
              </p>
            )}
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="state">State:</label>
            <input
              className=" border rounded p-2"
              type="text"
              id="state"
              {...register("address.state")}
            />
            {errors.address?.state && (
              <p className="text-sm text-red-500">
                {errors?.address?.state?.message}
              </p>
            )}
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="street">Street:</label>
            <input
              className=" border rounded p-2"
              type="text"
              id="street"
              {...register("address.street")}
            />
            {errors.address?.street && (
              <p className="text-sm text-red-500">
                {errors?.address?.street?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="hobbies">Hobbies:</label>
          <div>
            {fields.map((hobby, index: number) => (
              <div className="flex mb-4" key={hobby.id}>
                <div>
                  <input
                    className=" border rounded p-2 "
                    type="text"
                    {...register(`hobbies.${index}.name`)}
                  />
                  {errors.hobbies && (
                    <p className="text-sm text-red-500">
                      {errors?.hobbies[index]?.name?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="ml-3"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {errors.hobbies && (
              <p className="text-sm text-red-500">{errors?.hobbies?.message}</p>
            )}
          </div>
          <Button type="button" onClick={() => append({ name: "" })}>
            Add Hobby
          </Button>
        </div>
        <Button
          className="disabled:bg-gray-500"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting...." : "Submit"}
        </Button>
        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};

export default ComplexForm;
