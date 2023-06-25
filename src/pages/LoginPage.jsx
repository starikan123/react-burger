import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <form className={styles.loginForm}>
        <Input type="email" placeholder="E-mail" />
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
          Войти
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
