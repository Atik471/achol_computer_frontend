import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Achol Computer | Home</title>
                <meta name="description" content="Trusted electronics store in Bangladesh." />
            </Helmet>
            <Navbar />
            <h1 className="text-3xl font-bold underline">
                Home
            </h1>
        </div>
    );
};

export default Home;