import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://norma.nomoreparties.space/api/password-reset/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          onChange={handlePasswordChange}
          value={password}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleTokenChange}
          value={token}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p
        className={`${styles.loginLinkContainer} pt-4 text text_type_main-default`}
      >
        <span>Вспомнили пароль? </span>
        <Link to="/login" className={styles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
