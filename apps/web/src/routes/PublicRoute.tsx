import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  restricted = false,
}) => {
  const { user } = useAuth();

  if (user && restricted) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export default PublicRoute;
