import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Product = ({ product }) => {
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="flex flex-col">
        <img
          alt="products"
          className="inset-0 h-full w-full object-cover object-center rounded-md"
          src="https://dummyimage.com/420x260"
        />
        <div className="z-10 w-full mt-3">
          <h4 className="mb-2 text-lg font-semibold">{product.name}</h4>
          <div className="flex flex-row items-center justify-between">
            <p className="text-md font-semibold text-gray-600">
              {product.unit_price_incl_vat.toFixed(2)} €
            </p>
            <button
              className="bg-indigo-500 font-medium py-2 px-4 text-white rounded-md"
              onClick={() => dispatch({ type: "ADD", payload: product })}
            >
              <Link to="/cart">Add to cart</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
