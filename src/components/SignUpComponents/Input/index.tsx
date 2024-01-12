type Props = {
  label: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  required?: boolean;
};

const Input = ({ label, name, icon, type, placeholder, required = false}: Props) => {
  return (
    <>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label} {required && <span className="text-meta-1 ml-1">*</span>}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-2xl">
            {icon}
          </span>
          <input
            name={name}
            type={type}
            required
            placeholder={placeholder}
            className="w-full rounded-lg border text-graydark border-stroke bg-transparent py-4 pl-12 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
    </>
  );
};

export default Input;
