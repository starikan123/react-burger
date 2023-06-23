import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.registerContainer}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <form className={styles.registerForm}>
        <Input type="text" placeholder="Имя" />
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Пароль" />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${styles.registerLink} pt-20 text text_type_main-default`}>
        <span className={styles.loginLinkText}> Уже зарегистрированы? </span>{" "}
        <Link to="/login" className={styles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
