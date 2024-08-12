import { ProductsGrid, SectionTitle } from ".";

export default function ListedProducts() {
  return (
    <div className="mx-auto max-w-6xl px-8 pt-24">
      <SectionTitle text="popular products" />
      <ProductsGrid />
    </div>
  );
}
