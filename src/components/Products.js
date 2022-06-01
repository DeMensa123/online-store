import Header from "./Header";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <>
      <Header title="Products"></Header>
      <div className="container mx-auto my-12">
        <div className="flex flex-wrap justify-center">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <Product key={item.id} product={item}></Product>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
