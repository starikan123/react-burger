import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login, clearError } from "../js/services/actions/authActions";
import styles from "./LoginPage.module.css";
import { setCookie } from "../js/utils/cookieHelpers";
import { useForm } from "../js/hooks/useForm";

function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    if (!loading && !error && accessToken) {
      setCookie("token", accessToken);
      navigate("/", { replace: true });
    }
  }, [loading, error, accessToken, navigate]);

  useEffect(() => {
    if (error && error.includes("User already exists")) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className={styles.loginContainer}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          name="email"
        />
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password}
          name="password"
          icon={passwordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={togglePasswordVisibility}
        />
        <Button type="primary" size="medium" htmlType="submit">
          {loading ? "Вход..." : "Войти"}
        </Button>
      </form>

      <p className={`${styles.loginLinkContainer} text text_type_main-default`}>
        <span className={styles.loginLinkText}>Вы новый пользователь? </span>
        <Link to="/register" className={styles.registerLink}>
          Регистрация
        </Link>
      </p>
      <p
        className={`${styles.loginLinkContainer} pt-4 text text_type_main-default`}
      >
        <Link to="/forgot-password" className={styles.forgotPasswordLink}>
          Забыли пароль?
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
