import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Achol Computer | Home</title>
                <meta name="description" content="Trusted electronics store in Bangladesh." />
            </Helmet>
            <h1 className="text-3xl font-bold underline">
                Home
            </h1>
            <div className="text-3xl font-bold dark:p-20">Hello im dark</div>
        </div>
    );
};

export default Home;