import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { forgotPasswordRequest } from "../js/services/actions/authActions";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forgotPasswordStatus, error } = useSelector((state) => state.auth);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordRequest(email));
  };

  useEffect(() => {
    if (forgotPasswordStatus === "success") {
      navigate("/reset-password");
    } else if (forgotPasswordStatus === "failure") {
      console.error(error);
      // TODO: Display the error to the user in a friendly manner
    }
  }, [forgotPasswordStatus, error, navigate]);

  return (
    <div className={styles.forgotPasswordContainer}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={handleEmailChange}
          value={email}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default pt-20">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
