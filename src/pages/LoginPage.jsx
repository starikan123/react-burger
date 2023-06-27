import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginRequest } from "../js/services/actions/authActions";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input type="email" placeholder="E-mail" onChange={handleEmailChange} />
        <div className={styles.passwordContainer}>
          <Input
            type={passwordShown ? "text" : "password"}
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            icon={passwordShown ? "HideIcon" : "ShowIcon"}
            onIconClick={togglePasswordVisibility}
          />
        </div>
        <Button type="primary" size="medium">
          {loading ? "Вход..." : "Войти"}
        </Button>
      </form>
      {error && <p className="text text_type_main-default">{error}</p>}
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
