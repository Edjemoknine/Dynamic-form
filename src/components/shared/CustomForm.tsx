import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import InputField from "./Form/InputField";

const Formschema = z.object({
  Firstname: z.string().min(1, { message: "First Name is Required" }),
  Lastname: z.string().min(1, { message: "Last Name is Required" }),
  Password: z.string().min(1, { message: "Password is Required" }),
  Email: z.string().email({ message: "Email is required" }),
});
const CustomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof Formschema>>({
    resolver: zodResolver(Formschema),
  });

  const onSubmit = (data: z.infer<typeof Formschema>) => {
    console.log(errors);
    alert(JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 border rounded-lg p-6"
    >
      <InputField
        type="text"
        label="Firstname"
        register={register}
        errors={errors}
        required
      />
      <InputField
        type="text"
        label="Lastname"
        register={register}
        errors={errors}
        required
      />
      <InputField
        type="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
      <InputField
        type="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <button
        type="submit"
        className="bg-primary p-2 text-white w-fit px-8 rounded-lg hover:bg-primary/90"
      >
        Sign in
      </button>
    </form>
  );
};

export default CustomForm;
