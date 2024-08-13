interface FormSelectProps {
  label: string;
  name: string;
  list: string[];
  defaultValue?: string;
  size?: string;
}

export default function FormSelect({
  label,
  name,
  list,
  defaultValue,
  size,
}: FormSelectProps) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size} capitalize`}
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item.replace(": ", "-")}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
