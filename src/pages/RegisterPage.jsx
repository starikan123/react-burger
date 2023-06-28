import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerRequest } from "../js/services/actions/authActions";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerRequest({ name, email, password }));
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Input type="text" placeholder="Имя" onChange={handleNameChange} />
        <Input type="email" placeholder="E-mail" onChange={handleEmailChange} />
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          icon={passwordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={togglePasswordVisibility}
        />
        <Button type="primary" size="medium">
          {loading ? "Зарегистрироваться..." : "Зарегистрироваться"}
        </Button>
      </form>
      {error && <p className="text text_type_main-default">{error}</p>}
      <p className={`${styles.registerLink} pt-20 text text_type_main-default`}>
        <span className={styles.loginLinkText}>Уже зарегистрированы? </span>
        <Link to="/login" className={styles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
