import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h1 className="fs-5">Support Portal</h1>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 mx-3">
        <div className="col-6 p-5">
          <p className="fs-5 mb-3">
            Search for an answer or browse help topics to create a ticket
          </p>
          <input placeholder="Eg: how do i activate F&O, why is my order getting rejected.." />
          <br />
          <div id="links">
            <a href="">Track account opening</a>
            <a href="">Segment activation</a>
            <a href="">Intraday</a>
            <a href="">margins</a>
            <a href="">kit user manual</a>
          </div>
        </div>
        <div className="col-6 p-5">
          <h1>Featured</h1>
          <ol>
            <li className="mb-2">
              <a href="">Current Takeover and Delisting-January 2024</a>
            </li>
            <li>
              <a href="">Larest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
