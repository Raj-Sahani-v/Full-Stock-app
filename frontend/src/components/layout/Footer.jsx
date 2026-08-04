import { Link } from "react-router";

export default function Footer() {
  const a = { textDecoration: "none" };
  const li = { "list-style": "none", "margin-top": "15px" };
  return (
    <div className="container-fluid border-top mt-5 bg-light pb-5 ">
      <div className="row mt-5">
        <div className="col ">
          <div className="footer-logo mb-3 ">
            <img
              src="images/newlogo.jpeg"
              alt="Log"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
          <p>
            Master the stock market with real-time data and virtual money.
            Practice safely, learn faster, and trade confidently.
          </p>
          <div className="justify-content-center align-items-center ">
            <span>
              <Link to="">
                <i class="fa-brands fa-x-twitter fa-xl "></i>
              </Link>
            </span>
            <span>
              {" "}
              <Link to="">
                <i class="fa-brands fa-square-facebook fa-xl"></i>
              </Link>{" "}
            </span>
            <span>
              {" "}
              <Link to="">
                <i class="fa-brands fa-instagram fa-xl"></i>
              </Link>{" "}
            </span>
            <span>
              <Link to="">
                <i className="fa-brands fa-linkedin-in fa-xl"></i>
              </Link>
            </span>
          </div>
          <hr />
          <div className="mb-4  justify-content-center ">
            <span>
              <Link to="">
                <i class="fa-brands fa-youtube fa-xl"></i>
              </Link>
            </span>
            <span>
              <Link to="">
                <i class="fa-brands fa-whatsapp fa-xl"></i>
              </Link>
            </span>
            <span>
              <Link to="">
                <i class="fa-brands fa-telegram fa-xl"></i>
              </Link>
            </span>
          </div>
          {/* <div style={{ display: "flex" }}>
            <a to="">
              <img src="/images/googlePlayBadge.svg" alt="" />
            </a>
            <a to="">
              <img src="/images/appstoreBadge.svg" alt="" />
            </a>
          </div> */}
        </div>
        <div className=" col-lg">
          <h2>Platform</h2>
          <ul className="p-0">
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Live Markets
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Virtual Trading
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Portfolio Tracker
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Mobile App
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                API Access
              </Link>
            </li>
          </ul>
        </div>
        <div className=" col-lg ">
          <h2>Learn</h2>
          <ul className="p-0">
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Trading Academy
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Blog & Guides
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Strategy Center
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                {" "}
                Glossary
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Webinars
              </Link>
            </li>
          </ul>
        </div>
        <div className=" col-lg">
          <h2>Community</h2>
          <ul className="p-0">
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Leaderboards
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Challenges
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Top Traders
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Forum
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Discord
              </Link>
            </li>
          </ul>
        </div>
        <div className=" col-lg">
          <h2>Company</h2>
          <ul className="p-0">
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                About Us
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Careers
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Contact
              </Link>
            </li>
            <li style={li}>
              <Link to="" className="text-muted" style={a}>
                Press
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="row mb-5" >
        <div className="col text-center">
          <p>@ 2026 MockMarket. All Right Reserved. </p>
          <div className=" justify-content-center ">
            
            <Link>Privacy Policy</Link>
            <Link>Terms of Service </Link>
            <Link>Disclaimer</Link>
            <Link>Risk Warning</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
