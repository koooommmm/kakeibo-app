import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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

const options = {
  income: ["選択してください", "給与", "一時所得", "その他"],
  expense: [
    "選択してください",
    "食費",
    "日用品",
    "趣味・娯楽",
    "交通費",
    "衣類・美容",
    "健康・医療",
    "光熱費",
    "通信費",
    "その他",
  ],
};

const AddItem = (props) => {
  const updateItems = props.updateItems;
  const showAddItemModal = props.showAddItemModal;
  const setShowAddItemModal = props.setShowAddItemModal;

  const [kind, setKind] = useState("income");

  const handleCloseModal = () => {
    setKind("income");
    setShowAddItemModal(false);
  };

  const handleChangeTab = (element) => {
    setKind(element.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await axios.post("/items", {
      kind: data.get("kind"),
      category: data.get("category"),
      date: data.get("date"),
      name: data.get("name"),
      price: data.get("price"),
    });

    setShowAddItemModal(false);
    updateItems();
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
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="segment" onChange={handleChangeTab}>
              <input
                type="radio"
                name="kind"
                id="income"
                value="income"
                defaultChecked
              />
              <label className="segment-button" htmlFor="income">
                収入
              </label>

              <input type="radio" name="kind" id="expense" value="expense" />
              <label className="segment-button" htmlFor="expense">
                支出
              </label>
            </div>

            <div className="input-content">
              <input
                type="date"
                className="input"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="input-content">
              <select className="input" name="category">
                {options[kind].map((option) => (
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
                name="name"
              />
            </div>

            <div className="input-content">
              <input
                type="text"
                className="input"
                placeholder="金額を入力"
                name="price"
              />
            </div>

            <div className="addButton">
              <Button color="inherit" variant="contained" type="submit">
                登録
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    );
  }
};

export default AddItem;
