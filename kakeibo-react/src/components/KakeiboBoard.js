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
  const [isRendered, setIsRendered] = useState(false);

  const income_total = incomes.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const expense_total = expenses.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  const balance = income_total - expense_total;

  useEffect(() => {
    updateItems();
  }, []);

  // 登録ボタンが押下されたらモーダルを開くために状態を更新する
  const handleClickAddButton = () => {
    setShowAddItemModal(true);
  };

  const updateItems = async () => {
    // 収入・支出の取得
    const response_income = await axios.get("/items/income");
    const response_expense = await axios.get("/items/expense");
    setIncomes(response_income.data);
    setExpenses(response_expense.data);

    // 取得完了後に画面に反映する
    setIsRendered(true);
  };

  return isRendered ? (
    <>
      <h1 className="balance">¥{balance}</h1>
      <div className="item-list">
        <ItemList
          kind="income"
          items={incomes}
          total={income_total}
          updateItems={updateItems}
        />
        <ItemList
          kind="expense"
          items={expenses}
          total={expense_total}
          updateItems={updateItems}
        />
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
        updateItems={updateItems}
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
      />
    </>
  ) : (
    <></>
  );
};

export default KakeiboBoard;
