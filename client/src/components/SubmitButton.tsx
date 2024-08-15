import { useNavigation } from "react-router-dom";
import { LoadingDots } from ".";

interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className="btn btn-neutral btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? <LoadingDots /> : label || "Submit"}
    </button>
  );
}
