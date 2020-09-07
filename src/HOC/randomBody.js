import React from 'react';

const RandomBody = (WrappedComponent) => {
    const randomR1 = Math.floor(Math.random() * 255);
    const randomG1 = Math.floor(Math.random() * 255);
    const randomB1 = Math.floor(Math.random() * 255);
    const randomR2 = Math.floor(Math.random() * 255);
    const randomG2 = Math.floor(Math.random() * 255);
    const randomB2 = Math.floor(Math.random() * 255);

    const rgb1 = `rgb(${randomR1},${randomG1},${randomB1})`;
    const rgb2 = `rgb(${randomR2},${randomG2},${randomB2})`;

    const bodyStyle = {
        backgroundImage: `linear-gradient(to right, ${rgb1}, ${rgb2})`,
        minHeight: '100%'
    };

    return (props) => {
        return (
            <div style={bodyStyle}>
                <WrappedComponent {...props}/>
            </div>
        )
    }
}

export default RandomBody;