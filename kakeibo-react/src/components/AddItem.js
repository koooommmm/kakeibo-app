import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { width } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  minWidth: "fit-content",
  height: "55%",
  minHeight: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "hidden",
};

const income_options = ["給与", "一時所得", "その他"];
const expense_options = [
  "食費",
  "日用品",
  "趣味・娯楽",
  "交通費",
  "衣類・美容",
  "健康・医療",
  "光熱費",
  "通信費",
  "その他",
];

const AddItem = (props) => {
  const showAddItemModal = props.showAddItemModal;
  const setShowAddItemModal = props.setShowAddItemModal;

  const [tab, setTab] = useState("income");
  const [options, setOptions] = useState(income_options);

  const refDate = useRef();
  const refCategory = useRef();
  const refPrice = useRef();
  const refName = useRef();

  const handleCloseModal = () => {
    setShowAddItemModal(false);
  };

  const handleChangeTab = (e) => {
    if (e.target.value === "income") {
      setTab("income");
      setOptions(income_options);
    } else {
      setTab("expense");
      setOptions(expense_options);
    }
  };

  const handleAddItem = () => {
    const date = refDate.current.value;
    const category = refCategory.current.value;
    const price = refPrice.current.value;
    const name = refName.current.value;

    if ((date === "") | (category === "") | (price === "") | (name === ""))
      return;

    if (tab === "income") {
      props.setIncomes((prevItems) => {
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
    } else {
      props.setExpenses((prevItems) => {
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
    }

    refDate.current.value = null;
    refCategory.current.value = null;
    refPrice.current.value = null;
    refName.current.value = null;

    setShowAddItemModal(false);
  };

  if (showAddItemModal) {
    return (
      <Modal
        open={showAddItemModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="segment" onChange={handleChangeTab}>
            <input
              type="radio"
              name="tab"
              id="income"
              value="income"
              defaultChecked
            />
            <label className="segment-button" htmlFor="income">
              収入
            </label>

            <input type="radio" name="tab" id="expense" value="expense" />
            <label className="segment-button" htmlFor="expense">
              支出
            </label>
          </div>

          <div className="input-content">
            <input type="date" className="input" ref={refDate} />
          </div>
          <div className="input-content">
            <select className="input" ref={refCategory}>
              <option defaultValue="">選択してください</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="input-content">
            <input
              type="text"
              className="input"
              placeholder="内容を入力"
              ref={refName}
            />
          </div>
          <div className="input-content">
            <input
              type="text"
              className="input"
              placeholder="金額を入力"
              ref={refPrice}
            />
          </div>
          <div className="addButton">
            <Button color="inherit" variant="contained" onClick={handleAddItem}>
              登録
            </Button>
          </div>
        </Box>
      </Modal>
    );
  }
};

export default AddItem;
