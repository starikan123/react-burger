import React from "react";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import styles from "./reset-password.module.css";

const ResetPassword = () => {
  return (
    <section className={styles.resetPasswordContainer}>
      <ResetPasswordForm />
    </section>
  );
};

export default ResetPassword;
