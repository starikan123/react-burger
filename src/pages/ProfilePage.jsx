import styles from "./ProfilePage.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../js/services/actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../js/services/actions/authActions";
import { clearBurgerConstructor } from "../js/services/actions/constructorActions";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(updateUser(formData));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(clearBurgerConstructor());
    navigate("/");
  };

  return (
    <div className={styles.profile}>
      <div className={styles.column}>
        <ul className={styles.navigation}>
          <li>
            <NavLink to="/profile" className={styles.link}>
              <span className={`text text_type_main-medium ${styles.navText}`}>
                Профиль
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/orders" className={styles.link}>
              <span className={`text text_type_main-medium ${styles.navText}`}>
                История заказов
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/logout"
              className={styles.link}
              onClick={handleLogout}
            >
              <span className={`text text_type_main-medium ${styles.navText}`}>
                Выход
              </span>
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSave}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleInputChange}
          value={formData.name || ""}
          name="name"
        />
        <EmailInput
          onChange={handleInputChange}
          value={formData.email || ""}
          name="email"
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={handleInputChange}
          value={formData.password || ""}
          name="password"
          placeholder="Пароль"
        />
        <div className={styles.buttonContainer}>
          <Button
            type="secondary"
            size="medium"
            htmlType="reset"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
