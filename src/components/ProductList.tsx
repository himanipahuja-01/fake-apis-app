import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Product, useGetProductsQuery } from "../redux/productsApiSlice";
import AddProductDialog from "./AddProductDialog"; 
import { addProduct, updateProduct } from "../redux/productSlice"; 

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const storedProducts = useSelector(
    (state: RootState) => state.products.products
  );
  const {
    data: apiProducts,
    error,
    isLoading,
  } = useGetProductsQuery(undefined, {
    skip: storedProducts.length > 0,
  });

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = storedProducts.length > 0 ? storedProducts : apiProducts;

  const handleAddProduct = (newProduct: Product) => {
    dispatch(addProduct(newProduct));
    setOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
    setOpen(false); // Close dialog after update
  };

  const handleEditProductClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  if (isLoading && storedProducts.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setOpen(true)}>Add Product</button>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleEditProductClick(product)}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <AddProductDialog
        open={open}
        onClose={handleDialogClose}
        onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
        initialProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
