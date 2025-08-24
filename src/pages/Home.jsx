import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/HeroBanner";

const Home = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="">
            {/* <Helmet>
                <title>Achol Computer | Home</title>
                <meta name="description" content="Trusted electronics store in Bangladesh." />
            </Helmet> */}
            <HeroBanner />
        </div>
    );
};

export default Home;