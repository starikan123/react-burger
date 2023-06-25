import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <form className={styles.registerForm}>
        <Input type="text" placeholder="Имя" />
        <Input type="email" placeholder="E-mail" />
        <Input
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          icon={passwordShown ? "HideIcon" : "ShowIcon"}
          onIconClick={togglePasswordVisibility}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${styles.registerLink} pt-20 text text_type_main-default`}>
        <span className={styles.loginLinkText}> Уже зарегистрированы? </span>{" "}
        <Link to="/login" className={styles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
