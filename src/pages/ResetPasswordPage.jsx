import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { resetPassword } from "../js/services/actions/authActions";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(password, token));
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Введите новый пароль"
          onChange={handlePasswordChange}
          value={password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
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
        className={`${styles.loginLinkContainer} pt-20 text text_type_main-default`}
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
