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
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forgotPasswordStatus, error } = useSelector((state) => state.auth);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add some validation
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    dispatch(forgotPasswordRequest(email));
  };

  useEffect(() => {
    if (forgotPasswordStatus === "success") {
      navigate("/reset-password");
    } else if (forgotPasswordStatus === "failure") {
      setErrorMessage(error);
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
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <Button
          type="primary"
          size="medium"
          disabled={forgotPasswordStatus === "loading"}
        >
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
