import React from "react";
import styles from "./forgot-password.module.css";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <section className={styles.forgotPasswordSection}>
      <ForgotPasswordForm />
    </section>
  );
};

export default ForgotPassword;
