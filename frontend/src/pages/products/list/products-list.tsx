import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { getProducts } from "../../../api/products";
import { deleteProduct } from "../../../api/products/index";

import styles from "./products-list.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const ProductsList = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleFetchProducts = async () => {
    setLoading(true);
    const [payload, error] = await getProducts();

    if (payload) {
      setProducts(payload);
    } else {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    const [, error] = await deleteProduct(id);

    if (!error) {
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } else {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.upload}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => history.push("/upload")}
        >
          Upload csv file
        </Button>
      </div>
      <TableContainer className={styles.table} component={Paper}>
        <div className={styles.error}>{error}</div>
        <Toolbar className={styles.head}>
          <Typography className={styles.title} variant="h6" id="tableTitle">
            Products list
          </Typography>
          <Tooltip title="Add product">
            <IconButton aria-label="filter list" onClick={() => history.push("/products/add")}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">quantity</TableCell>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">description</TableCell>
              <TableCell align="right">price (zł)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="left">{product.quantity}</TableCell>
                <TableCell align="left" component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="left">{product.description}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="filter list"
                    onClick={() => history.push("/products/edit/" + product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="filter list"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!products.length && !loading && (
              <TableRow>
                <TableCell>No products found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsList;
