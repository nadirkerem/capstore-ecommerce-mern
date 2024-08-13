import {
  ProductFilters,
  ProductsContainer,
  Pagination,
  SectionTitle,
} from "../components";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 bg-base-200 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <div className="col-span-1">
        <ProductFilters />
      </div>
      <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
        <SectionTitle text="Products" />
        <ProductsContainer />
        <Pagination />
      </div>
    </div>
  );
}
