type Props = {
  label: string;
  register: any;
  required: boolean;
  type: string;
  errors: any;
};
const InputField = ({ label, register, required, type, errors }: Props) => {
  return (
    <>
      <label>{label}</label>
      <input
        className="border rounded p-2"
        type={type}
        {...register(label, { required })}
      />
      {errors[label]?.message && (
        <>
          <span className="text-xs text-red-500">{errors[label].message}</span>
        </>
      )}
    </>
  );
};

export default InputField;
