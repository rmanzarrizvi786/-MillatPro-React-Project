import Header from "./sections/Header/Header";
import Companies from "./sections/Companies/Companies";
import Deals from "./sections/Deals/Deals";
import Categories from "./sections/catigories/Categories";
import AllProducts from "./sections/AllProducts/AllProducts";
import InstagramStore from "./sections/InstagramStore/InstagramStore";
import { useSelector } from "react-redux";
import Trait from "./sections/Trait/Trait";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import MoreTopSelling from "./sections/OneMoreTop/MoreTopSelling";
import {
  useGetFeaturedProductQuery,
  useGetTopSellingProductsQuery,
} from "reduxStore/rtk";
import Loader from "components/Loader/Loader";
function Home() {
  const {
    data: dataOfFeatured,
    error: errorOfFeatured,
    isLoading: loadingOfFeatured,
  } = useGetFeaturedProductQuery();
  const {
    data: dataOfTopselling,
    error: errorOfTopSelling,
    isLoading: loadingOfTopSelling,
  } = useGetFeaturedProductQuery();
  const addToCartData = useSelector((value) => value.addToCart);
  
  return (
    <>
      {loadingOfFeatured && loadingOfTopSelling ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Header />
          <Deals />
          <Companies />
          <MoreTopSelling />
          <Categories />
          <AllProducts />
          <Trait />
          
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
