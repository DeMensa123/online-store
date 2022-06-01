const Reducer = (cart = [], action) => {
  // adding a product to cart
  if (action.type === "ADD") {
    const exist = cart.find((product) => product.id === action.payload.id);

    if (exist) {
      return cart.map((product) =>
        product.id === action.payload.id
          ? {
              ...exist,
              qty:
                parseInt(exist.qty) + 1 <= exist.stock_quantity
                  ? parseInt(exist.qty) + 1
                  : parseInt(exist.qty),
            }
          : product
      );
    } else {
      return [...cart, { ...action.payload, qty: 1 }];
    }
  }

  // removing a product from cart
  if (action.type === "REMOVE") {
    return cart.filter((product) => product.id !== action.payload.id);
  }

  // adjusting the product quantity
  if (action.type === "UPDATE") {
    const exist = cart.find((product) => product.id === action.payload.id);

    if (parseInt(action.newQty) === 0) {
      return cart.filter((product) => product.id !== action.payload.id);
    } else {
      return cart.map((product) =>
        product.id === action.payload.id
          ? {
              ...exist,
              qty:
                action.newQty <= exist.stock_quantity
                  ? action.newQty
                  : exist.qty,
            }
          : product
      );
    }
  }

  if (action.type === "DELETE") {
    cart.map((item) => {
      console.log(
        "Item: ",
        item.name,
        ", Quantity: ",
        item.qty,
        " Unit Price incl. VAT: ",
        item.unit_price_incl_vat,
        ", VAT: ",
        item.vat_category,
        " Total: ",
        item.qty * item.unit_price_incl_vat
      );
    });
    return [];
  }
};
export default Reducer;
