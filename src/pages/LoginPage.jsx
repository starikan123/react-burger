import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login, clearError } from "../js/services/actions/authActions";
import styles from "./LoginPage.module.css";
import { setCookie } from "../js/utils/cookieHelpers";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Access the navigate function

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (!loading && !error && accessToken) {
      setCookie("token", accessToken);
      navigate("/", { replace: true }); // Redirect to the home page using navigate
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
          onChange={handleEmailChange}
          value={email}
        />
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
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
