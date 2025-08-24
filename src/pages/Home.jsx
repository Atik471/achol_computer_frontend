import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/HeroBanner";
import FAQSection from "../components/FAQSection";
import FeaturedSection from "../components/FeaturedSection";

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
            <FeaturedSection name="Smartphones" slug="smartphones" />
            <FeaturedSection name="Computer Parts" slug="computer-parts" />
            <FAQSection />
        </div>
    );
};

export default Home;