import { Education } from "./component/Education";
import { Hero } from "./component/Hero";
import { KitConnect } from "./component/Kit-connect";
import { Lifecycle } from "./component/Life-cycle";
import { OpenAccount } from "./component/OpenAccount";
import { Pricing } from "./component/Pricing";

export function Home(){
    return(<>
        
        <Hero/>
        <Lifecycle/>
        <KitConnect/>
        <Pricing/>
        <Education/>
        <OpenAccount/>
        
        
    </>)
}