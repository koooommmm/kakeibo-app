import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const AddItem = (props) => {
  const setItems = props.setItems;
  const showAddItemModal = props.showAddItemModal;
  const setShowAddItemModal = props.setShowAddItemModal;

  const refDate = useRef();
  const refCategory = useRef();
  const refPrice = useRef();
  const refName = useRef();

  const handleCloseModal = () => {
    setShowAddItemModal(false);
  };

  const handleAddItem = () => {
    const date = refDate.current.value;
    const category = refCategory.current.value;
    const price = refPrice.current.value;
    const name = refName.current.value;

    if ((date === "") | (category === "") | (price === "") | (name === ""))
      return;

    setItems((prevItems) => {
      return [
        ...prevItems,
        {
          id: uuidv4(),
          date: date,
          category: category,
          price: parseInt(price),
          name: name,
        },
      ];
    });

    refDate.current.value = null;
    refCategory.current.value = null;
    refPrice.current.value = null;
    refName.current.value = null;

    setShowAddItemModal(false);
  };

  if (showAddItemModal) {
    return (
      <div id="overlay">
        <div id="content">
          日付: <input type="date" ref={refDate} />
          カテゴリ:
          <select ref={refCategory}>
            <option value="食費">食費</option>
            <option value="公共料金">公共料金</option>
            <option value="娯楽">娯楽</option>
          </select>
          金額: <input type="text" pattern="^[0-9]+$" ref={refPrice} />
          名前: <input type="text" ref={refName} />
          <button onClick={handleAddItem}>登録</button>
          <p>
            <button onClick={handleCloseModal}>close</button>
          </p>
        </div>
      </div>
    );
  }
};

export default AddItem;
