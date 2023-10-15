import React, { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import Ingredient from "./Ingredient/Ingredient";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const burgerIngredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const tabsHeight = 56;
  const bunTabRef = useRef(null);
  const sauceTabRef = useRef(null);
  const mainTabRef = useRef(null);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (!bunTabRef.current || !sauceTabRef.current || !mainTabRef.current) {
      return;
    }
    const bunPosition = Math.abs(
      bunTabRef.current.getBoundingClientRect().top - tabsHeight
    );
    const saucePosition = Math.abs(
      sauceTabRef.current.getBoundingClientRect().top - tabsHeight
    );
    const mainPosition = Math.abs(
      mainTabRef.current.getBoundingClientRect().top - tabsHeight
    );
    const minDistance = Math.min(bunPosition, saucePosition, mainPosition);

    if (minDistance === bunPosition) {
      setCurrentTab("bun");
    } else if (minDistance === saucePosition) {
      setCurrentTab("sauce");
    } else if (minDistance === mainPosition) {
      setCurrentTab("main");
    }
  };

  const tabRefs = {
    bun: bunTabRef,
    sauce: sauceTabRef,
    main: mainTabRef,
  };

  const handleTabClick = (section) => {
    setCurrentTab(section);
    const ref = tabRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h2>
      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>
      <div
        onScroll={handleScroll}
        className={`${styles.ingredients} custom-scroll`}
      >
        <h3
          ref={bunTabRef}
          className={`${styles.subtitle} text text_type_main-medium pl-5 mt-10`}
          id="buns"
        >
          Булки
        </h3>
        <ul className={styles.grid}>
          {burgerIngredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <Ingredient key={ingredient._id} ingredient={ingredient} />
            ))}
        </ul>
        <h3
          ref={sauceTabRef}
          className={`${styles.subtitle} text text_type_main-medium pl-5 mt-10`}
          id="sauce"
        >
          Соусы
        </h3>
        <ul className={styles.grid}>
          {burgerIngredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient) => (
              <Ingredient key={ingredient._id} ingredient={ingredient} />
            ))}
        </ul>
        <h3
          ref={mainTabRef}
          className={`${styles.subtitle} text text_type_main-medium pl-5 mt-10`}
          id="main"
        >
          Начинки
        </h3>
        <ul className={styles.grid}>
          {burgerIngredients
            .filter((ingredient) => ingredient.type === "main")
            .map((ingredient) => (
              <Ingredient key={ingredient._id} ingredient={ingredient} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
