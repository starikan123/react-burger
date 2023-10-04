import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { moveIngredient } from "../../services/actions/constructorActions";
import DraggableConstructorElementStyles from "./DraggableConstructorElement.module.css";

function DraggableConstructorElementComponent({
  index,
  ingredient,
  handleRemoveClick,
}) {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "constructorElement",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      ref={ref}
      className={`${DraggableConstructorElementStyles.list} ${
        isDragging && DraggableConstructorElementStyles.isDragging
      }`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={ingredient.type === "bun"}
        handleClose={
          ingredient.type !== "bun"
            ? () => handleRemoveClick(ingredient.uniqueId)
            : undefined
        }
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
      />
    </li>
  );
}

DraggableConstructorElementComponent.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
};

export default DraggableConstructorElementComponent;
