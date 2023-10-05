import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./App-header.module.css";

function AppHeader() {
  const getLinkClassName = (isActive) =>
    `${headerStyle.headerLink} ${isActive ? headerStyle.active : ""} p-5`;

  return (
    <header className={`${headerStyle.header} pt-4 pb-4`}>
      <div className={headerStyle.appContainer}>
        <nav>
          <ul className={headerStyle.headerLists}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => getLinkClassName(isActive)}
              >
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) => getLinkClassName(isActive)}
              >
                <ListIcon type="secondary" />
                <span className="text text_type_main-default pl-2">
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink
          to="/profile"
          className={({ isActive }) => getLinkClassName(isActive)}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default pl-2">
            Личный кабинет
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
