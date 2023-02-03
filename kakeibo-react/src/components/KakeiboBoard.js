import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import "./KakeiboBoard.css";
import Button from "@mui/material/Button";

const KakeiboBoard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const income_total = incomes.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const expense_total = expenses.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const balance = income_total - expense_total;

  // 登録ボタンが押下されたらモーダルを開くために状態を更新する
  const handleClickAddButton = () => {
    setShowAddItemModal(true);
  };

  useEffect(() => {
    // 収入の取得
    axios.get("/items/income").then((response) => {
      setIncomes(response.data);
    });

    // 支出の取得
    axios.get("/items/expense").then((response) => {
      setExpenses(response.data);
    });
  }, []);

  return (
    <>
      <h1 className="balance">¥{balance}</h1>
      <div className="item-list">
        <ItemList kind="income" items={incomes} total={income_total} />
        <ItemList kind="expense" items={expenses} total={expense_total} />
      </div>
      <div className="addButton">
        <Button
          color="inherit"
          variant="contained"
          onClick={handleClickAddButton}
        >
          登録
        </Button>
      </div>
      <AddItem
        setIncomes={setIncomes}
        setExpenses={setExpenses}
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
      />
    </>
  );
};

export default KakeiboBoard;
