import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img
              src="media/images/logo.svg"
              alt="logo"
              style={{ width: "50%" }}
            />
            <p>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              About
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Products
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Pricing
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Referral programme
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Careers
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Zerodha.tech
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Press & media
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Zerodha cares (CRS)
            </a>
          </div>
          <div className="col">
            <p>Support</p>
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Contact
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Support portal
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Z-connet blog
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              List of changes
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Downloads & resources
            </a>
          </div>
          <div className="col">
            <p>Account</p>
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Open an account
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              Fund transfer
            </a>
            <br />
            <a href="" className="mb-6 mt-6" style={{ textDecoration: "none" }}>
              60 day challenge
            </a>
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE& BSE B SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. • SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 E SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | IC
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive alerts on
            your registered mobile for all debit and other important
            transactions in your demat account. Issued in the interest of
            investors." Dear Investor, "KYC is one time exercise while dealing
            in securities markets - once KYC is done through a SEBI registered
            intermediary (broker, DP, mutual fund etc.), you need not undergo
            the same process again when you approach another intermediary.
            However, you are required to update your KYC with any change in your
            address or bank details.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
