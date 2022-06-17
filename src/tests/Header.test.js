import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Header from "../components/Header";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders title", () => {
  act(() => {
    render(<Header title="Cart" />, container);
  });
  expect(container.textContent).toBe("Cart");

  act(() => {
    render(<Header title="Products" />, container);
  });
  expect(container.textContent).toBe("Products");

  act(() => {
    render(<Header title="Thank you for your order" />, container);
  });
  expect(container.textContent).toBe("Thank you for your order");
});
