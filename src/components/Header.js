import React from "react";

const Header = ({ title }) => {
  return (
    <header className="mb-6 text-3xl font-semibold">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
