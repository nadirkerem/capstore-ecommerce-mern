/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Pagination() {
  const { meta } = useLoaderData() as any;
  const { totalPages, currentPage } = meta;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  function handlePageChange(page: number) {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", String(page));
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <div className="mt-8 flex justify-center">
      <div className="join">
        <button
          className="btn join-item btn-xs sm:btn-md"
          onClick={() =>
            handlePageChange(currentPage < 2 ? 1 : currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn join-item btn-xs border-none sm:btn-md ${
              currentPage === page && "bg-neutral"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn join-item btn-xs sm:btn-md"
          onClick={() =>
            handlePageChange(
              currentPage > totalPages - 1 ? totalPages : currentPage + 1,
            )
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
