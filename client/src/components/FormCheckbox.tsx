interface FormCheckboxProps {
  label: string;
  name: string;
  defaultValue?: boolean;
  size?: string;
}

export default function FormCheckbox({
  label,
  name,
  defaultValue,
  size,
}: FormCheckboxProps) {
  return (
    <div className="form-control items-center">
      <label htmlFor={label} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox-neutral checkbox ${size}`}
      />
    </div>
  );
}
