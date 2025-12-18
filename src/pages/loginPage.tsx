import { useState } from "react";
import { LoginForm, LoginFormValues } from "../components/auth/loginForm";
import { authApi } from "../api/authApi";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(undefined);

    try {
      await authApi.login(values);

      // test session
      const me = await authApi.getCurrentUser();
      alert("Login OK: " + me.data.username);
    } catch (e: any) {
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <h2 style={{ textAlign: "center" }}>Đăng nhập Bố Chuột 🐭</h2>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
