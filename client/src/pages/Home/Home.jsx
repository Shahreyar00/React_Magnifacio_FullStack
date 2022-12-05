import React from "react";
import { Categories, Contact, FeaturedProducts, Slider } from "../../components";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <Slider />
            <FeaturedProducts type="featured" />
            <Categories />
            <FeaturedProducts type="trending" />
            <Contact />
        </div>
    );
};

export default Home;