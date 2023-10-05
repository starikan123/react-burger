import styles from "./ProfilePage.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../js/services/actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../js/services/actions/authActions";
import { clearBurgerConstructor } from "../js/services/actions/constructorActions";
import { useForm } from "../js/hooks/useForm";

const ProfilePage = () => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  }, [user, setValues]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(updateUser(values));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setValues({
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
    });
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
          onChange={handleChange}
          value={values.name || ""}
          name="name"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email || ""}
          name="email"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ""}
          name="password"
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
