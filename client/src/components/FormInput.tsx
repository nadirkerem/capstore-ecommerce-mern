interface FormInputProps {
  label?: string;
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  altLabel?: string;
  size?: string;
}

export default function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  altLabel,
  size,
}: FormInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered w-full ${size}`}
      />
      {altLabel && (
        <div className="label">
          <span className="label-text-alt">{altLabel}</span>
        </div>
      )}
    </label>
  );
}
