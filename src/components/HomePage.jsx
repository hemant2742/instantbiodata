import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>
                        Create a Stunning <span className="highlight">Marriage Biodata</span>
                    </h1>

                    <p className="hero-subtitle">
                        Free professional formats • Build in minutes • No signup required
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/form"
                            className="btn btn-primary btn-large"
                        >
                            🎨 Create My Biodata
                        </Link>

                        <Link
                            to="/templates"
                            className="btn btn-secondary btn-large"
                        >
                            📋 Explore Popular Designs
                        </Link>
                    </div>

                    <div className="stats-counter">
                        <span className="stats-number">445+</span>
                        <span className="stats-text">
                            biodatas created today — absolutely free
                        </span>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="biodata-samples">
                        <div className="sample-card sample-1">
                            <div className="sample-header">
                                <div className="sample-photo"></div>
                                <h3>Priya Sharma</h3>
                            </div>
                            <div className="sample-content">
                                <div className="sample-line"></div>
                                <div className="sample-line short"></div>
                                <div className="sample-line"></div>
                            </div>
                        </div>

                        <div className="sample-card sample-2">
                            <div className="sample-header">
                                <div className="sample-photo"></div>
                                <h3>Rahul Patel</h3>
                            </div>
                            <div className="sample-content">
                                <div className="sample-line"></div>
                                <div className="sample-line short"></div>
                                <div className="sample-line"></div>
                            </div>
                        </div>

                        <div className="sample-card sample-3">
                            <div className="sample-header">
                                <div className="sample-photo"></div>
                                <h3>Anjali Singh</h3>
                            </div>
                            <div className="sample-content">
                                <div className="sample-line"></div>
                                <div className="sample-line short"></div>
                                <div className="sample-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="features-section">
                <h2>Popular Marriage Biodata Designs</h2>
                <p>Discover InstantBiodata's most downloaded marriage biodata templates! Browse popular layouts, stylish designs, and creative content ideas to inspire your own biodata.</p>
                <p>See what works best and make yours stand out instantly!</p>

                <div className="cta-section">
                    <p>Select your favorite biodata design to get started</p>
                    <Link
                        to="/templates"
                        className="btn btn-primary"
                    >
                        View All Designs
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;