import React from "react";
import "../../fonts/fonts.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./App-header.module.css";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const isActive = (path) => window.location.pathname === path;

  return (
    <nav className={styles.header}>
      <ul className={styles.menuLeft}>
        <li
          className={`${styles.menuItem} ${isActive("/") ? styles.active : ""}`}
        >
          <Link to="/" className={styles.link}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            isActive("/feed") ? styles.active : ""
          }`}
        >
          <Link to="/feed" className={styles.link}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default ml-2">
              Лента заказов
            </span>
          </Link>
        </li>
      </ul>
      <Logo className={styles.logo} />
      <div className={styles.menuRight}>
        <Link to="/profile" className={styles.link}>
          <div
            className={`${styles.menuItem} ${
              isActive("/profile") ||
              isActive("/login") ||
              isActive("/forgot-password") ||
              isActive("/reset-password")
                ? styles.active
                : ""
            }`}
          >
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default ml-2">
              Личный кабинет
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AppHeader;
