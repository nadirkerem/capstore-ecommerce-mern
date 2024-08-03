interface FormInputProps {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  altLabel?: string;
}

export default function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  altLabel,
}: FormInputProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      {altLabel && (
        <div className="label">
          <span className="label-text-alt">{altLabel}</span>
        </div>
      )}
    </label>
  );
}
