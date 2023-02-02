import React from "react";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import { useState } from "react";

const KakeiboBoard = () => {
  const [expences, setExpenses] = useState([]);

  const expences_total = expences.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  return (
    <>
      <ItemList kind="expence" items={expences} total={expences_total} />
      <AddItem setItems={setExpenses} />
    </>
  );
};

export default KakeiboBoard;
