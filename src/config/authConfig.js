// Keycloak Configuration
export const KEYCLOAK = "http://192.168.0.157:8080";
export const REALM = "Dong-keycloak";
export const CLIENT_ID = "React-Dong";
export const REDIRECT_URI = "http://localhost:4000/callback";

// Keycloak OIDC Endpoints
export const AUTH_URL =
  `${KEYCLOAK}/realms/${REALM}/protocol/openid-connect/auth`;

export const TOKEN_URL =
  `${KEYCLOAK}/realms/${REALM}/protocol/openid-connect/token`;

export const LOGOUT_URL =
  `${KEYCLOAK}/realms/${REALM}/protocol/openid-connect/logout`;

// Helper to get Authorization header for API calls
export const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};