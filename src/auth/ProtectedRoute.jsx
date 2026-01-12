import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { token, initialized, login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (initialized && !isAuthenticated()) {
      login();
    }
  }, [initialized, isAuthenticated, login]);

  if (!initialized) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return children;
}
