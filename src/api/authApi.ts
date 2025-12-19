import axios from 'axios';
import { token } from '../api/token.ts';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getToken = async (): Promise<string | null> => {
  try {
    const res = await axios.post<TokenResponse>(
      "http://localhost:8080/oauth2/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic ZG9uZzEzMTAyMDoxMzEwMjA=", // Base64(client_id:client_secret)
        },
      }
    );

    const accessToken = res.data.access_token;
    token.set(accessToken);
    return accessToken;
  } catch (err: any) {
    console.error("Lấy token thất bại:", err.response?.data || err.message);
    token.clear();
    return null;
  }
};