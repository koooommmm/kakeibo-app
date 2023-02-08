import React from "react";
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
  height: "45%",
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

const EditItem = (props) => {
  const updateItems = props.updateItems;
  const showEditItemModal = props.showEditItemModal;
  const setShowEditItemModal = props.setShowEditItemModal;
  const item = props.item;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setShowEditItemModal(false);
    await axios.put("/items", {
      category: data.get("category"),
      date: data.get("date"),
      name: data.get("name"),
      price: data.get("price"),
      id: item.id,
    });

    setShowEditItemModal(false);
    updateItems();
  };

  if (showEditItemModal) {
    return (
      <Modal
        open={showEditItemModal}
        onClose={() => {
          setShowEditItemModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="input-content">
              <input
                type="date"
                className="input"
                name="date"
                defaultValue={item.date.split("T")[0]}
              />
            </div>

            <div className="input-content">
              <select
                defaultValue={item.category}
                className="input"
                name="category"
              >
                {options[item.kind].map((option) => (
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
                defaultValue={item.name}
              />
            </div>

            <div className="input-content">
              <input
                type="text"
                className="input"
                placeholder="金額を入力"
                name="price"
                defaultValue={item.price}
              />
            </div>

            <div className="addButton">
              <Button color="inherit" variant="contained" type="submit">
                更新
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    );
  }
};

export default EditItem;
