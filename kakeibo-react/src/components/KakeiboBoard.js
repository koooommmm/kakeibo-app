import React from "react";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import { useState } from "react";
import "./KakeiboBoard.css";
import Button from "@mui/material/Button";

const KakeiboBoard = () => {
  const [incomes, setIncomes] = useState([
    {
      id: 1,
      date: "2022-02-03",
      category: "給与",
      price: 250000,
      name: "給与",
    },
  ]);
  const [expences, setExpenses] = useState([
    {
      id: 1,
      date: "2022-02-03",
      category: "食費",
      price: 1000,
      name: "ラーメン",
    },
  ]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const income_total = incomes.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const expence_total = expences.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const balance = income_total - expence_total;

  const handleClickAddButton = () => {
    setShowAddItemModal(true);
  };

  return (
    <>
      <h1 className="balance">¥{balance}</h1>
      <div className="item-list">
        <ItemList kind="income" items={incomes} total={income_total} />
        <ItemList kind="expence" items={expences} total={expence_total} />
      </div>
      <div className="addButton">
        <Button variant="contained" onClick={handleClickAddButton}>
          登録
        </Button>
      </div>
      <AddItem
        setItems={setExpenses}
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
      />
    </>
  );
};

export default KakeiboBoard;
