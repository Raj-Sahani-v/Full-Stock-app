import React from "react";
import { PricingTable } from "../../../components/layout/PricingTable";
import { ChargeTable } from "../../../components/layout/ChargeTable";

export const Table = () => {
  return (
    <div className="container-lg container-fluid p-4 ">
    <PricingTable/>
    <ChargeTable/>
    </div>
  );
};
