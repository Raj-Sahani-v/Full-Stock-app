import { Link } from "react-router";
import { ZeroRisk } from "./ZeroRisk";

export const Hero = () => {
  return (
    <div className="container-lg container-fluid mt-5 ">
      <div className="row">
       <div className="ms-5 text-center" style={{width:"90%"}} >
         <ZeroRisk/>
       </div>
        {/* <div className="text-start mb-5 mt-5 ms-5 p-3" style={{width:"100vw"}} >
            <h1 style={{fontSize:"60px"}} >Master the Stock Market</h1>
            <h1 style={{fontSize:"60px"}} >with Zero Risk</h1>
          </div> */}
       
      </div>
       <div className="row m-5 " >
          
          <div className="col-lg-12 text-muted mt-2"  > 
            <div style={{width:"60vw"}} ><p className="" style={{textAlign:"justify"}}>
            Trade with real-time market data using virtual money. Practice
            strategies, build your portfolio, and complete with traders
            worldwide - without losing a single rupee.
          </p></div>
          <ul>
            <li>10,000+ Active Traders</li>
            <li>Real-time NSE & BSE</li>
            <li>$1 Crore+ Vitual Portfolio Value Traded Daily</li>
          </ul>
          </div>

          <div className="col-lg-12 text-center mt-5 ">
            <button
            className="btn btn-primary p-2 fs-6 mt-3"
            type="submit"
            style={{  margin: "0 auto", backgroundColor: "green" }}
          >
            {" "}
            <Link to={"/signup"} style={{ color: "white" }}>
              Start Trading Now
            </Link>{" "}
          </button>
          </div>
        </div>
    </div>
  );
};
