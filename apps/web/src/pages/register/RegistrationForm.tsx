import React, { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Alert,
  Collapse,
  Link,
  Grid2 as Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormTextField from "@/components/form/FormTextField";
import PasswordField from "@/components/form/PasswordField";
import { registrationValidationSchema } from "./validationSchema";

interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues: RegistrationFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };

  const handleSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);

    try {
      // This would typically be an API call to register the user
      console.log("Registration form submitted:", values);

      // For demo purposes, simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to login page after successful registration
      navigate("/login", { state: { registrationSuccess: true } });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormTextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormTextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
          </Grid>

          <FormTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <PasswordField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="new-password"
          />

          <PasswordField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            autoComplete="new-password"
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                color="primary"
                name="agreeToTerms"
                checked={values.agreeToTerms}
                onChange={handleChange}
              />
            }
            label={
              <span>
                I agree to the{" "}
                <Link href="#" underline="hover">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
              </span>
            }
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={isSubmitting}
            loadingIndicator="Creating account..."
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
