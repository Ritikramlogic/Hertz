import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/_Header/index";

export default function Layout2(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
