import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import {
  resetPassword,
  resetForgotPasswordInitiated,
} from "../js/services/actions/authActions";
import { useForm } from "../js/hooks/useForm";

function ResetPasswordPage() {
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetPasswordSuccess, forgotPasswordInitiated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!forgotPasswordInitiated) {
      navigate("/forgot-password");
      return;
    }

    if (resetPasswordSuccess) {
      dispatch(resetForgotPasswordInitiated());
      navigate("/login");
    }
  }, [resetPasswordSuccess, forgotPasswordInitiated, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(values.password, values.token));
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Введите новый пароль"
          onChange={handleChange}
          value={values.password}
          name="password"
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.token}
          name="token"
        />
        <Button type="primary" size="medium" htmlType="submit">
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
