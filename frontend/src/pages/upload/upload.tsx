import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import { object, mixed } from "yup";
import { Button } from "@material-ui/core";
import { saveAs } from "file-saver";

import { uploadFile } from "../../api/file/index";

import styles from "./upload.module.css";

interface Values {
  file: string;
}

const initialData: Values = {
  file: "",
};

const validationSchema = object().shape({
  file: mixed().required("A file is required"),
});

const Upload = () => {
  const history = useHistory();

  const [error, setError] = useState("");

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const data = new FormData();
    data.append("file", values.file);

    const [payload, error] = await uploadFile(data);

    if (payload) {
      handleCreateCsvFile(payload);
    } else {
      setError(error.message);
    }
    setSubmitting(false);
  };

  const handleCreateCsvFile = (payload: any) => {
    const buffer = Buffer.from(payload, "utf8");
    const csv = buffer.toString();
    const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });

    saveAs(blob, "processed_emails.csv");
  };

  const handleGetFile = (e: any, setFieldValue: any) => {
    let file = e.target.files[0];
    if (file) {
      setFieldValue("file", file);
    }
  };

  return (
    <div>
      <Formik initialValues={initialData} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, touched, setFieldValue, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Remove yahoo emails</h1>
            <h5>Removes all rows with yahoo email from uploaded csv file</h5>
            <span className={styles.error}>{error}</span>
            <div>
              <input
                accept=".csv"
                type="file"
                name="file"
                onChange={(e) => handleGetFile(e, setFieldValue)}
                onBlur={handleBlur}
              />
            </div>
            <span className={styles.error}>{errors.file && touched.file && errors.file}</span>
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
                Process file
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Upload;
