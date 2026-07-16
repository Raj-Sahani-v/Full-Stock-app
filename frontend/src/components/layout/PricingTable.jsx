import { Link } from "react-router"


export const PricingTable = () => {
  return (
    <div className="container-lg container-fluid">
        <div className="row">
            <div className="col">
         <nav class="d-flex">
    <a href="/pricing/tab-equity" class="flex-fill text-center">Equity</a>
    <a href="#tab-fo" class="flex-fill text-center">F&O</a>
    <a href="#tab-currency" class="flex-fill text-center">Currency</a>
    <a href="#tab-commodity" class="flex-fill text-center">Commodity</a>
</nav>
            </div>
        </div>

    </div>
  )
}
