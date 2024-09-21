import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index != -1) {
        state.products[index] = action.payload;
      }
    },
    setProductById(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.products.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        state.products[index] = product;
      } else {
        state.products.push(product);
      }
    },
  },
});


export const {setProducts, addProduct, updateProduct, setProductById} = productSlice.actions;
export default productSlice.reducer;    