import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { TOKEN_STORAGE_FIELD } from "../../constant/auth.constant";
import { signIn } from "../../api/user/index";

import styles from "./login.module.css";

interface Values {
  login: string;
  password: string;
}

const initialData: Values = {
  login: "",
  password: "",
};

const validationSchema = object().shape({
  login: string()
    .min(4, "Login is too short")
    .max(20, "Login is too long")
    .required("Login is required"),
  password: string()
    .min(4, "Password is too short")
    .max(20, "Password is too long")
    .required("Password is required"),
});

const Login = () => {
  const history = useHistory();

  const [error, setError] = useState("");

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const [payload, error] = await signIn(values);

    if (payload) {
      localStorage.setItem(TOKEN_STORAGE_FIELD, payload.accessToken);
      history.push("/");
    } else {
      setError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <Formik initialValues={initialData} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <span className={styles.error}>{error}</span>
              <TextField
                label="Login"
                name="login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
              />
              <span className={styles.error}>{errors.login && touched.login && errors.login}</span>
              <TextField
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password"
              />
              <span className={styles.error}>
                {errors.password && touched.password && errors.password}
              </span>
              <Button
                variant="contained"
                color="primary"
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
