import { useState } from "react";
import "../../css/loginForm.css";

export interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  error?: string;
}

export const LoginForm = ({ onSubmit, loading = false, error }: LoginFormProps) => {
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });

  // sự kiện thay đổi khi người dùng nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.username || !values.password) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Nhập tên "
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
