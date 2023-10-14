import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./ResetPasswordForm.module.css";
import { resetPassword } from "../../services/actions/resetPasswordForm";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPasswordForm = () => {
  const [tokenValue, setTokenValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleResetPasswordClick = () => {
    dispatch(resetPassword(passwordValue, tokenValue));
  };

  const handleResetPasswordFormSubmit = (e) => {
    e.preventDefault();
    handleResetPasswordClick();
  };

  const onPasswordChange = (e) => setPasswordValue(e.target.value);
  const onTokenChange = (e) => setTokenValue(e.target.value);

  useEffect(() => {
    if (!location.state || location.state.from !== "/forgot-password") {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  return (
    <form
      className={styles.resetPasswordForm}
      onSubmit={handleResetPasswordFormSubmit}
    >
      <p className="text text_type_main-medium pb-10">Восстановление пароля</p>
      <PasswordInput
        value={passwordValue}
        onChange={onPasswordChange}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input
        value={tokenValue}
        onChange={onTokenChange}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>
      <div className={styles.rememberPassword}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? пароль?
        </p>
        <Button
          style={{ padding: "0px 0px 0px 8px" }}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
