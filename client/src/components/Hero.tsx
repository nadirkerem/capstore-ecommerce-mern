import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="hero min-h-[700px] bg-cover"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/1200)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Welcome to CapStore
          </h1>
          <p className="mb-5 text-white">
            Discover a wide range of high-quality products at unbeatable prices.
            We have everything you need in one place. Start shopping now and
            find your favorites!
          </p>
          <Link to="/products">
            <button className="btn btn-neutral">Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
