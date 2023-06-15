import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./App-header.module.css";

function AppHeader() {
  const getLinkClassName = (props) =>
    `${headerStyle.headerLink} ${props.isActive ? headerStyle.active : ""} p-5`;

  return (
    <header className={`${headerStyle.header} pt-4 pb-4`}>
      <div className={headerStyle.appContainer}>
        <nav>
          <ul className={headerStyle.headerLists}>
            <li>
              <NavLink to="/" className={getLinkClassName} activeClassName="">
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="orders"
                className={getLinkClassName}
                activeClassName=""
              >
                <ListIcon type="secondary" />
                <span className="text text_type_main-default pl-2">
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Logo />
        <NavLink to="profile" className={getLinkClassName} activeClassName="">
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
