import React from "react";
import "./page404.css";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const Page404 = () => {
  return (
    <>
    <Navbar/>
      <section id="not-found">
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link to="/" className="more-link">
            Home
          </Link>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Page404;
