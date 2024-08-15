import { Link } from "react-router-dom";

export default function ComingSoonPage() {
  return (
    <main className="grid min-h-[600px] place-items-center">
      <div className="text-center">
        <p className="text-8xl font-bold text-primary">
          <span role="img" aria-label="construction">
            🚧
          </span>
        </p>
        <h1 className="mt-6 text-center text-4xl font-bold">
          This page is under construction
        </h1>
        <Link to="/" className="btn btn-neutral mt-6">
          Go back home
        </Link>
      </div>
    </main>
  );
}
