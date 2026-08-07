import Products from "../components/Products";
import Footer from "../components/Footer";

function ShopPage({ onAddToCart }) {
  return (
    <>
      <Products onAddToCart={onAddToCart} />
      <Footer />
    </>
  );
}

export default ShopPage;
