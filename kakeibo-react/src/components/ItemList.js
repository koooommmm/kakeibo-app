import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import EditItem from "./EditItem";

const ItemList = (props) => {
  const kind = props.kind;
  const items = props.items;
  const total = props.total;
  const updateItems = props.updateItems;
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editItem, setEditItem] = useState();

  const handleEditItem = (item) => {
    setEditItem(item);
    setShowEditItemModal(true);
  };

  const handleDeleteItem = async (id) => {
    await axios.delete("/items", { data: { id: id } });
    updateItems();
  };

  return (
    <>
      <div className="item">
        <h2 className={kind}>¥{total}</h2>

        <TableContainer component={Paper}>
          <Table sx={{ width: "fit-content" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.date.split("T")[0]}
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEditItem(item);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDeleteItem(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <EditItem
        updateItems={updateItems}
        showEditItemModal={showEditItemModal}
        setShowEditItemModal={setShowEditItemModal}
        item={editItem}
      />
    </>
  );
};

export default ItemList;
