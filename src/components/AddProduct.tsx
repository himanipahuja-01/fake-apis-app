import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAddProductMutation } from "../redux/productsApiSlice";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void; 
  initialProduct?: any; 
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  initialProduct,
}) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });

  const [addProduct] = useAddProductMutation();
  useEffect(() => {
    if (initialProduct) {
      setNewProduct(initialProduct);
    } else {
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        image: "",
        category: "",
      });
    }
  }, [initialProduct, open]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addProduct(newProduct).unwrap(); 
      onClose();
    } catch (error) {
      console.error("Failed to add product: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialProduct ? "Update Product" : "Add New Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          type="text"
          fullWidth
          variant="outlined"
          value={newProduct.image}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="outlined"
          value={newProduct.category}
          onChange={handleChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {initialProduct ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
