import styles from "./ProfilePage.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setActive = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : "text_color_inactive"}`;

  return (
    <div className={styles.profile}>
      <div className={styles.column}>
        <ul className={styles.navigation}>
          <li>
            <NavLink to="/profile" className={setActive}>
              <span className="text text_type_main-medium ">Профиль</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/orders" className={setActive}>
              <span className="text text_type_main-medium ">
                История заказов
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/logout" className={setActive}>
              <span className="text text_type_main-medium ">Выход</span>
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          value={formData.name}
          name={"name"}
        />
        <EmailInput
          onChange={handleInputChange}
          value={formData.email}
          name={"email"}
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formData.password}
          name={"password"}
          placeholder="Пароль"
        />
      </form>
    </div>
  );
};

export default ProfilePage;
