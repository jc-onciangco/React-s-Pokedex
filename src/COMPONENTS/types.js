import React from 'react';

const Types = () => {
    const style = {
        types: {
            backgroundColor: 'violet',
            minHeight: '100vh',
            width: '100%'
        }
    }

    return (
        <div className="pokeomon-types" style={style.types}>
            ALL POKEMON TYPES
        </div>
    )
}

export default Types;