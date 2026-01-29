import { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import FAQSection from "../components/FAQSection";
import FeaturedSection from "../components/FeaturedSection";

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="-mt-16">
            <HeroBanner />
            <FeaturedSection name="Featured Laptops" slug="laptop" />
            <FAQSection />
        </div>
    );
};

export default Home;