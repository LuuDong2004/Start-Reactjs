import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const { handleCallback } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorParam = searchParams.get("error");

    // Handle OAuth error from Keycloak
    if (errorParam) {
      const errorDescription = searchParams.get("error_description") || errorParam;
      setError(errorDescription);
      setLoading(false);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    // Handle missing code
    if (!code) {
      setError("No authorization code received");
      setLoading(false);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    // Exchange code for token
    handleCallback(code, state)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message || "Authentication failed");
        setLoading(false);
        setTimeout(() => navigate("/"), 3000);
      });
  }, [searchParams, handleCallback, navigate]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Completing sign in...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return null;
}
