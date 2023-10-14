import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./login.module.css";

const LoginPage = () => {
  return (
    <section className={styles.loginContainer}>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
