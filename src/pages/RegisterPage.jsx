import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register, clearError } from "../js/services/actions/authActions";
import styles from "./RegisterPage.module.css";
import { useForm } from "../js/hooks/useForm";

function RegisterPage() {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(values.email, values.password, values.name));
  };

  const handleLoginRedirect = () => {
    dispatch(clearError());
    navigate("/login");
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          value={values.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
        />
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password}
          icon={passwordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={togglePasswordVisibility}
        />
        <Button type="primary" size="medium" htmlType="submit">
          {loading ? "Зарегистрироваться..." : "Зарегистрироваться"}
        </Button>
      </form>
      {error && <p className="text text_type_main-default">{error}</p>}
      <p className={`${styles.registerLink} pt-20 text text_type_main-default`}>
        <span className={styles.loginLinkText}>Уже зарегистрированы? </span>
        <a className={styles.loginLink} onClick={handleLoginRedirect}>
          Войти
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
