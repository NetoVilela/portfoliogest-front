import { LuPhone } from 'react-icons/lu';
import { PatternFormat } from 'react-number-format';


type Props = {
  error: boolean;
  helperText: string;
  value: string;
  name: string;
  setValue: (name: string, val: string) => void;
};
export default function PhoneInput({ error, helperText, name, value, setValue, }: Props) {
  return (
    <div className="w-full sm:w-1/2 mb-2">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
        Celular
      </label>
      <div className="relative">
        <span className="absolute left-4.5 top-4">
          <LuPhone size={20} />
        </span>

        <PatternFormat
          format="(##) # ####-####"
          placeholder="(99) 9 9999-9999"
          autoComplete='tel-national'
          className="w-full rounded border border-stroke bg-gray pl-11.5 pr-4.5 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          value={value}
          onValueChange={(values) => {
            setValue(name, values.value);
          }}
        />
        {error && <p className="text-danger text-xs mt-1 font-medium"><>{helperText}</></p>}
      </div>

    </div>
  );
}
