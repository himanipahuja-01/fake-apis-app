import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addProduct, setProductById, setProducts, updateProduct } from "./productSlice";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setProducts(data));
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProductById(data)); 
        } catch (error) {
          console.error("Error fetching product by ID:", error);
        }
      },
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProduct(data));
        } catch (error) {
          console.error("Error adding product:", error);
        }
      },
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct.id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProduct(data)); 
        } catch (error) {
          console.error("Error updating product:", error);
        }
      },
    }),
  }),
});

export const { useGetProductsQuery,useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation } = productsApi;
