import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Products = ({ cartItems, total }) => {
  return (
    <>
      <Header title="Thank you for your order"></Header>
      <div className="container flex flex-col items-center justify-center my-12 ">
        <table className="table-auto mx-auto mb-12">
          <tbody className="text-sm text-gray-600">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <tr className="border-b-2 " key={item.id}>
                  <td className="py-2 px-3">
                    <div className="">{item.qty}x</div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="text-left font-medium">{item.name}</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <p className="text-gray-600 mb-12">
          Please send us the payment of
          <span className="text-2xl font-semibold"> {total.toFixed(2)} € </span>
          to our bitcoin address.
        </p>
        <button className="bg-indigo-500 font-medium my-3 py-2 px-5 text-white rounded-md">
          <Link to="/products">Continue shopping</Link>
        </button>
      </div>
    </>
  );
};

export default Products;
