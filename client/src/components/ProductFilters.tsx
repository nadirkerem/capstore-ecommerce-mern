/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, useLoaderData, Link } from "react-router-dom";
import { FormCheckbox, FormInput, FormRange, FormSelect } from "./";

export default function ProductFilters() {
  const { categories, brands, params } = useLoaderData() as any;
  const { search, category, brand, sort, maxPrice, freeShipping } = params;

  return (
    <Form className="w-xl mx-auto mt-12 grid items-center gap-x-4 gap-y-8 rounded-md px-8 py-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4">
      <FormInput
        type="search"
        label="Search Product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect
        label="Select Category"
        name="category"
        list={["All", ...categories]}
        size="select-sm"
        defaultValue={category}
      />
      <FormSelect
        label="Select Brand"
        name="brand"
        list={["All", ...brands]}
        size="select-sm"
        defaultValue={brand}
      />
      <FormSelect
        label="Sort By"
        name="sort"
        list={[
          "newest",
          "oldest",
          "rating",
          "price: low-to-high",
          "price: high-to-low",
          "a-z",
          "z-a",
        ]}
        size="select-sm"
        defaultValue={sort}
      />
      <FormRange
        label="Max Price"
        name="maxPrice"
        size="range-sm"
        maxPrice={maxPrice}
      />
      <FormCheckbox
        name="freeShipping"
        label="Free Shipping"
        size="checkbox-sm"
        defaultValue={freeShipping}
      />
      <button type="submit" className="btn btn-success btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-error btn-sm">
        Reset
      </Link>
    </Form>
  );
}
