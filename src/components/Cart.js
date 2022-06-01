import Header from "./Header";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

const Cart = ({ total, total_ex_vat, onSendOrder }) => {
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const filterUniqueVAT = (value, index, self) => {
    return (
      self.findIndex(
        (v) =>
          (v.vat_category === value.vat_category) & (value.vat_category !== 0)
      ) === index
    );
  };

  const computeVAT = (currentVAT) => {
    return cart
      ? cart
          .filter((item) => item.vat_category === currentVAT)
          .reduce(
            (vat, currentValue) =>
              (vat =
                vat +
                (currentValue.qty *
                  currentValue.unit_price_incl_vat *
                  currentValue.vat_category) /
                  (currentValue.vat_category + 100)),
            0
          )
      : 0;
  };

  return (
    <>
      <Header title="Cart"></Header>
      <div className="container mx-auto my-12 w-full max-w-2xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-sm text-black">
            <tr>
              <th className="p-2">
                <div className="text-left font-semibold">Item</div>
              </th>
              <th className="p-2">
                <div className="text-left font-semibold">Quantity</div>
              </th>
              <th className="p-2">
                <div className="text-right font-semibold">
                  Unit Price incl. VAT
                </div>
              </th>
              <th className="p-2">
                <div className="text-right font-semibold">VAT</div>
              </th>
              <th className="p-2">
                <div className="text-right font-semibold">Total</div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                <tr className="border-b-2" key={item.id}>
                  <td className="p-2 ">
                    <div className="text-left font-medium">{item.name}</div>
                  </td>

                  <td className="flex flex-row p-2">
                    <input
                      className="my-1 px-3 py-1 w-11 border-2 text-center rounded-md"
                      type="text"
                      name="quantity"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE",
                          payload: item,
                          newQty: e.target.value,
                        })
                      }
                    ></input>
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: item })
                        }
                      >
                        <FaTrashAlt className="text-gray-600 ml-3"></FaTrashAlt>
                      </button>
                    </div>
                  </td>

                  <td className="p-2">
                    <div className="text-right font-medium">
                      {item.unit_price_incl_vat.toFixed(2)} €
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-right font-medium">
                      {item.vat_category.toFixed(0)}%
                    </div>
                  </td>

                  <td className="p-2">
                    <div className="text-right font-medium text-base text-black">
                      {(item.unit_price_incl_vat * item.qty).toFixed(2)} €
                    </div>
                  </td>
                </tr>
              ))}

            <tr className="border-b-2">
              <td></td>
              <td></td>
              <td></td>
              <td className="p-3">
                <div className="text-right font-medium">Total excl. VAT</div>
              </td>
              <td className="p-3">
                <div className="text-right font-medium text-base text-black">
                  {total_ex_vat.toFixed(2)} €
                </div>
              </td>
            </tr>
            {cart &&
              cart.length > 0 &&
              cart.filter(filterUniqueVAT).map((item) => (
                <tr className="border-b-2" key={item.id}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="p-3">
                    <div className="text-right font-medium">
                      VAT {item.vat_category}%
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-right font-medium text-base text-black">
                      {computeVAT(item.vat_category).toFixed(2)} €
                    </div>
                  </td>
                </tr>
              ))}

            <tr className="border-b-2">
              <td></td>
              <td></td>
              <td></td>
              <td className="p-3">
                <div className="text-right font-bold">Total</div>
              </td>
              <td className="p-3">
                <div className="text-right text-base font-bold text-black">
                  {total.toFixed(2)} €
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="w-full max-w-2xl flex flex-row items-center justify-between">
          <div className="flex flex-row items-center text-indigo-500 ">
            <FaArrowLeft className="mr-2 font-medium"></FaArrowLeft>
            <Link to="/products">Back</Link>
          </div>
          <button
            className="bg-indigo-500 font-medium my-3 py-2 px-5 text-white rounded-md"
            onClick={onSendOrder}
          >
            <Link to="/order">Send order</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
