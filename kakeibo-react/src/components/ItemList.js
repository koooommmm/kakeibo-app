import React from "react";

const ItemList = (props) => {
  const kind = props.kind;
  const items = props.items;
  const total = items.reduce((sum, element) => {
    return sum + element.price;
  }, 0);

  return (
    <>
      <h1>¥{total}</h1>
      <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>¥{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ItemList;
