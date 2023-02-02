import React from "react";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import { useState } from "react";

const KakeiboBoard = () => {
  const [expences, setExpenses] = useState([]);

  return (
    <>
      <ItemList kind="expence" items={expences} />
      <AddItem setItems={setExpenses} />
    </>
  );
};

export default KakeiboBoard;
