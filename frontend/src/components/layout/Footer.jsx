export default function Footer() {
  const a = { textDecoration: "none" };
  const li = { "list-style": "none", "margin-top": "15px" };
  return (
    <div className="container-lg border-top mt-5 bg-light">
      <div className="row mt-5">
        <div className=" col ">
          <div className="footer-logo ">
            <img src="images/logo.svg" alt="Log" style={{ width: "50%" }} />
          </div>
          <p>
            <i class="fa-regular fa-copyright"></i>2010-2026, Zerodha Broking
            Ltd.
          </p>
          <p>All rights reserved.</p>
          <div>
            <span>
              <a href="">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            </span>
            <span>
              {" "}
              <a href="">
                <i class="fa-brands fa-square-facebook"></i>
              </a>{" "}
            </span>
            <span>
              {" "}
              <a href="">
                <i class="fa-brands fa-instagram"></i>
              </a>{" "}
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </span>
          </div>
          <hr />
          <div>
            <span>
              <a href="">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-telegram"></i>
              </a>
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <a href="">
              <img src="/images/googlePlayBadge.svg" alt="" />
            </a>
            <a href="">
              <img src="/images/appstoreBadge.svg" alt="" />
            </a>
          </div>
        </div>
        <div className=" col-lg">
          <h2>Account</h2>
          <ul className="p-0">
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Open demat account
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Minor demat account
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                NRI demat account
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                HUF demat account
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Commodity
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Dematerialisation
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Fund transfer
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                MTF
              </a>
            </li>
          </ul>
        </div>
        <div className=" col-lg">
          <h2>Support</h2>
          <ul className="p-0">
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Contact us
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Support portal
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                How to file a compalaint?{" "}
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                {" "}
                Status of your complaints{" "}
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Bulletin
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Circular
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Z-Connect blog
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Download
              </a>
            </li>
          </ul>
        </div>
        <div className=" col-lg">
          <h2>Company</h2>
          <ul className="p-0">
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                About
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Philosophy
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Press & media
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Careers
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Zerodha Cares {"(CSR)"}
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Zerodha.tech
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Open source
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Referral program
              </a>
            </li>
          </ul>
        </div>
        <div className=" col-lg">
          <h2>Quick links</h2>
          <ul className="p-0">
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Upcoming IPOs
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Brokerage charges
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Market holidays
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Economic calendar
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Calculators
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                {" "}
                Markets{" "}
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Sectors
              </a>
            </li>
            <li style={li}>
              <a href="" className="text-muted" style={a}>
                Gift Nifty
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI
            Registration no.: INZ000031633 CDSL/NSDL: Depository services
            through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
            Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
            Bengaluru - 560078, Karnataka, India. For any complaints pertaining
            to securities broking please write to{" "}
            <a href="" style={a}>
              complaints@zerodha.com
            </a>
            , for DP related to{" "}
            <a href="" style={a}>
              dp@zerodha.com
            </a>
            . Please ensure you carefully read the Risk Disclosure Document as
            prescribed by SEBI | ICF
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Procedure to file a complaint on{" "}
            <a href="" style={a}>
              SEBI SCORES
            </a>
            : Register on SCORES portal. Mandatory details for filing complaints
            on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits:
            Effective Communication, Speedy redressal of the grievances
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            {" "}
            <a href="">Smart Online Dispute Resolution</a> |{" "}
            <a href="">Grievances Redressal Mechanism</a>
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Attention investors: 1{")"} Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2{")"} Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from depository on your e-mail and/or mobile number to
            create pledge. 3{")"} Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            India's largest broker based on networth as per NSE.{" "}
            <a href="">NSE broker factsheet</a>
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers/depository
            participants. Receive information of your transactions directly from
            Exchange/Depositories on your mobile/email at the end of the day.
            Issued in the interest of investors. KYC is one time exercise while
            dealing in securities markets - once KYC is done through a SEBI
            registered intermediary {"("}broker, DP, Mutual Fund etc.{")"}, you
            need not undergo the same process again when you approach another
            intermediary." Dear Investor, if you are subscribing to an IPO,
            there is no need to issue a cheque. Please write the Bank account
            number and sign the IPO application form to authorize your bank to
            make payment in case of allotment. In case of non allotment the
            funds will remain in your bank account. As a business we don't give
            stock tips, and have not authorized anyone to trade on behalf of
            others. If you find anyone claiming to be part of Zerodha and
            offering such services, please <a href="">create a ticket here</a>.
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            *Customers availing insurance advisory services offered by Ditto{" "}
            {"("}Tacterial Consulting Private Limited | IRDAI Registered
            Corporate Agent {"("}Composite{")"} License No CA0738{")"} will not
            have access to the exchange investor grievance redressal forum, SEBI
            SCORES/ODR, or arbitration mechanism for such products.
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Fixed deposit products offered on this platform are third-party
            products (TPP) and are not Exchange traded products. These are
            offered through Blostem Fintech Private Limited. Zerodha Broking
            Limited (SEBI Registration No.: INZ000031633) is acting solely as a
            distributor for these products. Any disputes arising with respect to
            such distribution activity will not have access to SEBI SCORES/ODR,
            Exchange Investor Grievance Redressal Forum, or Arbitration
            mechanism. Fixed deposits are regulated by the Reserve Bank of India
            (RBI).
          </p>
        </div>
        <div className="text-center">
          <a href="" className="text-muted">NSE</a>
          <a href="" className="text-muted ms-3">BSE</a>
          <a href="" className="text-muted ms-3">MCX</a>
          <a href="" className="text-muted ms-3">MSEI</a>
          <a href="" className="text-muted ms-3">Terms & conditions</a>
          <a href="" className="text-muted ms-3">Policies & procedures</a>
          <a href="" className="text-muted ms-3">Privacy policy</a>
          <a href="" className="text-muted ms-3">Disclosure</a>
          <a href="" className="text-muted ms-3">For investor's attention</a>
          <a href="" className="text-muted ms-3">Investor charter</a>
          <a href="" className="text-muted ms-3">Sitamap</a>
        </div>
      </div>
    </div>
  );
}
