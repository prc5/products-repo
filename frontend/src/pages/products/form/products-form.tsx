import React, { useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import { object, string, number } from "yup";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { Button } from "@material-ui/core";
import { updateProduct, createProduct, getProductById } from "../../../api/products/index";

import styles from "./products-form.module.css";

interface Values {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const initialValues: Values = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const validationSchema = object().shape({
  name: string()
    .min(1, "Name is too short")
    .max(20, "Name is too long")
    .required("Name is required"),
  description: string()
    .min(1, "Description is too short")
    .max(20, "Description is too long")
    .required("Description is required"),
  price: number().min(1, "Price is too small").required("Price is required"),
  quantity: number().required("Quantity is required"),
});

const ProductsForm = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<any>();

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Values>(initialValues);
  const [error, setError] = useState("");

  const isEdit = location.pathname.includes("edit");

  useEffect(() => {
    const handleFetchProduct = async () => {
      setLoading(true);
      const [payload, error] = await getProductById(params.productId);

      if (payload) {
        setInitialData(payload);
      } else {
        setError(error.message);
      }
      setLoading(false);
    };

    if (isEdit) {
      handleFetchProduct();
    }
  }, [isEdit, params.productId]);

  const handleSendProductData = (values: Values) => {
    if (isEdit) {
      return updateProduct(initialData.id, values);
    } else {
      return createProduct(values);
    }
  };

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const [payload, error] = await handleSendProductData(values);

    if (payload) {
      history.push("/");
    } else {
      setError(error.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return "loading...";
  }

  return (
    <div>
      <h1 className={styles.title}>Add product</h1>
      <Formik initialValues={initialData} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <span className={styles.error}>{error}</span>
            <TextField
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              label="name"
            />
            <span className={styles.error}>{errors.name && touched.name && errors.name}</span>
            <TextField
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              label="description"
            />
            <span className={styles.error}>
              {errors.description && touched.description && errors.description}
            </span>
            <TextField
              type="number"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              label="price"
            />
            <span className={styles.error}>{errors.price && touched.price && errors.price}</span>
            <TextField
              type="number"
              name="quantity"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.quantity}
              label="quantity"
            />
            <span className={styles.error}>
              {errors.quantity && touched.quantity && errors.quantity}
            </span>

            <div className={styles.btn}>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                disabled={isSubmitting}
                onClick={() => history.push("/")}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isEdit ? "Update" : "Create"} product
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductsForm;
