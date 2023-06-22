import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={styles.loginForm}>
        <Input type="email" placeholder="E-mail" />
        <div className={styles.passwordContainer}>
          <Input type="password" placeholder="Пароль" />
          <div className={styles.showIcon}>
            <ShowIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.loginLinkContainer}>
        <p
          className={`${styles.loginLinkText} text text_type_main-default pr-1 `}
        >
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${styles.registerLink} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <p className={`${styles.loginLink} text text_type_main-default pt-4`}>
        <span className={styles.loginLinkText}>Забыли пароль?</span>{" "}
        <Link to="/forgot-password" className={styles.registerLink}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
