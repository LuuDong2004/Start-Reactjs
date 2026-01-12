import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_URL, TOKEN_URL, LOGOUT_URL, CLIENT_ID, REDIRECT_URI } from "../config/authConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    if (t) setToken(t);
    setInitialized(true);
  }, []);

  /* ===== PKCE ===== */

  const random = () =>
    btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const sha256 = async (text) => {
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  /* ===== LOGIN ===== */

  const login = async () => {
    try {
      const verifier = random();
      const state = random();
      const challenge = await sha256(verifier);

      localStorage.setItem("pkce_verifier", verifier);
      localStorage.setItem("oauth_state", state);

      const url =
        `${AUTH_URL}?client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&scope=openid profile email` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&state=${state}` +
        `&code_challenge=${challenge}` +
        `&code_challenge_method=S256`;

      window.location.href = url;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /* ===== CALLBACK ===== */

  const handleCallback = async (code, state) => {
    try {
      setError(null);

      // Validate state parameter (CSRF protection)
      const storedState = localStorage.getItem("oauth_state");
      if (!storedState || state !== storedState) {
        throw new Error("Invalid state parameter - possible CSRF attack");
      }

      const codeVerifier = localStorage.getItem("pkce_verifier");
      if (!codeVerifier) {
        throw new Error("Missing PKCE verifier");
      }

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier
      });

      const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error_description || errorData.error || "Token exchange failed");
      }

      const data = await res.json();

      if (!data.access_token) {
        throw new Error("No access token received");
      }

      // Store token
      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      setToken(data.access_token);

      // Clean up PKCE and state
      localStorage.removeItem("pkce_verifier");
      localStorage.removeItem("oauth_state");

      return data;
    } catch (err) {
      setError(err.message);
      // Clean up on error
      localStorage.removeItem("pkce_verifier");
      localStorage.removeItem("oauth_state");
      throw err;
    }
  };

  /* ===== LOGOUT ===== */

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("pkce_verifier");
    localStorage.removeItem("oauth_state");
    setToken(null);
    setError(null);

    window.location.href =
      `${LOGOUT_URL}?client_id=${CLIENT_ID}&post_logout_redirect_uri=${encodeURIComponent("http://localhost:4000")}`;
  };

  /* ===== IS AUTHENTICATED ===== */

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      login, 
      logout, 
      handleCallback, 
      initialized, 
      error,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
