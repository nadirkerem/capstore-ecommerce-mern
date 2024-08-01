/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="text-center">
          <p className="text-primary text-8xl font-bold">404</p>
          <h1 className="mt-6 text-center text-4xl font-bold">
            Sorry, the page you are looking for cannot be found.
          </h1>
          <Link to="/" className="btn btn-secondary mt-6">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="text-center">
        <p className="text-primary text-8xl font-bold">:(</p>
        <h1 className="mt-6 text-center text-4xl font-bold">
          Sorry, something went wrong.
        </h1>
        <Link to="/" className="btn btn-secondary mt-6">
          Go back home
        </Link>
      </div>
    </main>
  );
}
