import React from "react";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import { useState } from "react";
import "./KakeiboBoard.css";

const KakeiboBoard = () => {
  const [expences, setExpenses] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const handleClickAddButton = () => {
    setShowAddItemModal(true);
  };

  return (
    <>
      <ItemList kind="expence" items={expences} />
      <button onClick={handleClickAddButton}>登録</button>
      <AddItem
        setItems={setExpenses}
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
      />
    </>
  );
};

export default KakeiboBoard;
