import React, { useState } from "react";
import { Alert, Collapse } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormTextField from "@/components/form/FormTextField";
import PasswordField from "@/components/form/PasswordField";
import { loginValidationSchema } from "./validationSchema";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    _values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);

    try {
      navigate("/home"); // Redirect to dashboard on success
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form style={{ width: "100%" }}>
          <Collapse in={!!error} timeout={500}>
            <Alert
              severity="error"
              sx={{ mb: 2, width: "100%" }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Collapse>

          <FormTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <PasswordField
            type="password"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={isSubmitting}
            loadingIndicator="Signing in..."
            sx={{ mt: 2, mb: 2, py: 1.5 }}
          >
            Sign In
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
