interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button type="submit" className="btn btn-primary">
      {label}
    </button>
  );
}
