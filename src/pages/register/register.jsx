import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./register.module.css";

const Register = () => {
  return (
    <section className={styles.registerContainer}>
      <RegisterForm />
    </section>
  );
};

export default Register;
