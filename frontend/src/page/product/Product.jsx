import { Link } from "react-router"
import { Hero } from "./component/Hero"
import { LeftShift } from "./component/LeftShift"
import { RightShift } from "./component/RightShift"

export const Product = () => {
  return (
    <>
    <Hero/>
    
    <LeftShift title={"Kite"} main_image={"/images/kite.png"} description={"Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."} a_title={"Try demo  "} b_title="Learn more" arowwIconA={"a"} arowwIconB={"b"} />

    <RightShift title={"Console"} desc={"The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."} aTitle={"Learn more"} mainImage={"/images/console.png"} />

    <LeftShift main_image={"/images/coin.png"} title={"Coin"} description={"Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."} a_title={"coin"} arowwIconA="a" />

    <RightShift mainImage={"/images/kiteconnect.png"} title={"Kite Connect API "}  desc={"Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."} aTitle={"Kite Connect"} />
    <LeftShift main_image={"/images/varsity.png"} description={"An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."} title={"Varsity mobile"} />
    <div className="container">
        <div className="row">
            <div className="col text-center mt-5 ">
                <p className="fw-semibold">Want to know more about our technology stack? Check out the <Link>Zerodha.tech</Link> blog. </p>
            </div>
        </div>
    </div>
    </>
  )
}
