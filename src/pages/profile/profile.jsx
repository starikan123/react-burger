import React from "react";
import styles from "./profile.module.css";
import { Link, Outlet, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/profileForm";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const matchProfile = useMatch("/profile");
  const matchProfileOrders = useMatch("/profile/orders");

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <section className={styles.profileSection}>
      <nav className={styles.navElement}>
        <ul className={`${styles.leftNav} text mb-20`}>
          <Link className={styles.link} to="/profile">
            <li
              className={`${styles.navItem} text_type_main-medium ${
                !matchProfile ? "text_color_inactive" : ""
              }`}
            >
              Профиль
            </li>
          </Link>
          <Link className={styles.link} to="/profile/orders">
            <li
              className={`${styles.navItem} text_type_main-medium ${
                !matchProfileOrders ? "text_color_inactive" : ""
              }`}
            >
              История заказов
            </li>
          </Link>
          <li
            onClick={handleLogoutClick}
            className={`${styles.navItem} text_type_main-medium text_color_inactive`}
          >
            Выход
          </li>
        </ul>
        <p className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </section>
  );
};

export default ProfilePage;
