import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
      <Modal
        open={showAddItemModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>
            <input type="date" className="input" ref={refDate} />
          </p>
          <p>
            <select className="input" ref={refCategory}>
              <option value="食費">食費</option>
              <option value="公共料金">公共料金</option>
              <option value="娯楽">娯楽</option>
            </select>
          </p>
          <p>
            <input
              type="text"
              className="input"
              placeholder="内容を入力"
              ref={refName}
            />
          </p>
          <p>
            <input
              type="text"
              className="input"
              placeholder="金額を入力"
              ref={refPrice}
            />
          </p>
          <div className="addButton">
            <Button variant="contained" onClick={handleAddItem}>
              登録
            </Button>
          </div>
        </Box>
      </Modal>
    );
  }
};

export default AddItem;
