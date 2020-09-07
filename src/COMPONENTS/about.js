import React from 'react';

const About = () => {
    const aboutPage = {
        display: 'grid',
        placeItems: 'center',
        height: '100%'
    }

    const about = {
        textAlign: 'center'
    }

    const title = {
        fontSize: '2rem'
    }

    return (
        <div className="container" style={aboutPage}>
            <div style={about}>
                <h2 style={title}>REACT + POKEDEX = POKEREX</h2>
                <p>
                  Simple pokedex app built with react js, and pokeapi for data.
                  This app is for my personal project only.
                </p>
            </div>
        </div>
    )
}

export default About;