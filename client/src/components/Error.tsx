import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <h2 className="text-3xl font-bold">
      An error occurred! Please try again later.
    </h2>
  );
}
