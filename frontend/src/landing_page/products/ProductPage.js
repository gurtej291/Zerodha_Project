import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform, Kite, is designed to make trading simple and efficient. With a sleek interface and powerful features, it’s the go-to choice for millions of traders."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/console.png"
        productName="Console"
        productDescription="The central dashbord for your Zerodha account. Gain insight into your trading and investment activities with Console. Track your portfolio, analyze your trades, and manage your funds all in one place."
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/coin.png"
        productName="Coin"
        productDescription="By direct mutual funds, Coin is the simplest way to invest in mutual funds online. With zero commissions and no hidden fees, it’s the most cost-effective way to grow your wealth."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Kite connect API"
        productDescription="Build powerful trading platforms with our Kite Connect API. Designed for developers, it provides access to real-time market data, order placement, and portfolio management, enabling you to create custom trading solutions."
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Varsity mobile"
        productDescription="An easy to grasp, collection of stock market and trading concepts, Varsity is your go-to resource for learning about the markets. With bite-sized lessons and practical examples, it’s perfect for both beginners and experienced traders."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <p className="text-center mt-5 mb-5">
        Want to know more about our technology stack? Check out the Zerodha.tech
        blog.
      </p>

      <Universe />
    </>
  );
}

export default ProductPage;
