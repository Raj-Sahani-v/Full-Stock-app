// import { Button } from "@mui/material";

// export const Account = () => {
//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col d-flex gap-3 border ">
//             <p>My Account </p>
//             <p>LOGOUT</p>
//           </div>
//           <div className="row">
//             <div className="col d-flex border ">
//               <div className=" d-flex ">
//                 <span>RS</span>{" "}
//                 <div>
//                   <p>Raj Sahani</p>
//                   <p>VIEW PROFILE</p>
//                 </div>
//               </div>

//               <div className=" ">
//                 <Button>Add funds to start trading</Button>
//               </div>
//             </div>
//           </div>
//           <div className="row border ">
//             <p>Report</p>
//             <div className="col-3">Trades & Charges</div>
//             <div className="col-3">Statements</div>
//             <div className="col-3">Profile & Loss</div>
//             <div className="col-3">Trading Insights</div>
//           </div>

//           <div className="row border">
//             <div className="col border ">
//               <p>O</p>
//               <p>Offers & Rewards</p>
//               <p>Save more with special offers for you</p>
//             </div>
//             <div className="col border">
//               <p>R</p>
//               <p>Refer & Earn</p>
//               <p>Refer a friend to join MockMarket & get rewarded ₹50</p>
//             </div>
//             <div className="col border ">
//               <p>S</p>
//               <p>Subscription Plans</p>
//               <p>Curated plans to help you save on trading charges</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Button } from "@mui/material";
import "./Account.css";

export const Account = () => {
  return (
    <div className="account-page">
      <div className="container">

        {/* Header */}
        <div className="account-card account-header">
          <p className="mb-0">My Account</p>
          <p className="mb-0 logout-btn">LOGOUT</p>
        </div>

        {/* Profile */}
        <div className="account-card profile-section">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar">RS</div>

            <div>
              <p className="profile-name">Raj Sahani</p>
              <p className="view-profile mb-0">VIEW PROFILE</p>
            </div>
          </div>

          <Button variant="contained">
            Add Funds
          </Button>
        </div>

        {/* Reports */}
        <div className="report-card">
          <h5 className="mb-4">Reports</h5>

          <div className="row">
            <div className="col-md-3 report-item">
              Trades & Charges
            </div>
            <div className="col-md-3 report-item">
              Statements
            </div>
            <div className="col-md-3 report-item">
              Profit & Loss
            </div>
            <div className="col-md-3 report-item">
              Trading Insights
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">O</div>
              <p className="feature-title">Offers & Rewards</p>
              <p className="feature-desc">
                Save more with special offers for you.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">R</div>
              <p className="feature-title">Refer & Earn</p>
              <p className="feature-desc">
                Refer a friend & get rewarded ₹50.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">S</div>
              <p className="feature-title">Subscription Plans</p>
              <p className="feature-desc">
                Curated plans to save on trading charges.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};