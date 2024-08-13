import { useState } from "react";

import { formatPrice } from "../utils/format";

interface FormRangeProps {
  label: string;
  name: string;
  size?: string;
  maxPrice?: number;
}

export default function FormRange({
  label,
  name,
  size,
  maxPrice,
}: FormRangeProps) {
  const step = 1000;
  const defaultMaxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState<number>(
    maxPrice || defaultMaxPrice,
  );

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={defaultMaxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(Number(e.target.value))}
        step={step}
        className={`range-neutral range ${size}`}
      />
      <div className="mt-2 flex w-full justify-between px-2 text-xs">
        <span>0</span>
        <span>{formatPrice(defaultMaxPrice)}</span>
      </div>
    </div>
  );
}
