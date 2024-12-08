import React, { useEffect } from 'react';
import './pagenotfound.css'; // Assuming the CSS is saved in this file

const PageNotFound = () => {
    useEffect(() => {

        document.body.classList.add("page-background");
        return () => {
          document.body.classList.remove("page-background");
        };
      }, []);
    return (
        <div className="page-not-found-container">
            <header className="top-header"></header>

            {/* Dust Particles */}
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>

            {/* Lamp */}
            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                        <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>

            {/* Error Content */}
            <section className="error">
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">Page Not Found</h1>
                        <p className="message__text">
                            We're sorry, the page you were looking for isn't found here. 
                            The link you followed may either be broken or no longer exists. 
                            Please try again, or return to the homepage.
                        </p>
                    </div>
                    <div className="error__nav e-nav">
                        <a href="/" className="e-nav__link">Go Back Home</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageNotFound;
