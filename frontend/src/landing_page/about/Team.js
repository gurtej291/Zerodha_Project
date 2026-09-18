import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted fs-6"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="media/images/myPic.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Gurtej Singh</h4>
          <h6>CSE Student</h6>
        </div>
        <div className="col-6 p-5">
          <p>
            Gurtej joined Zerodha in 2025 while his Computer Science degree,
            determined to simplify retail investing for the next generation of
            traders.
          </p>
          <p>
             He designs and codes intuitive features across Kite and other
            upcoming platforms, drawing on his MERN‑stack and
            product‑photography background to keep usability
            front‑and‑center. Away from the editor, he’s often chasing perfect
            light for his next shoot—capturing clean frames is his zen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
