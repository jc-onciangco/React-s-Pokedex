import React from 'react';
import colors from './colors';
import {Link}from 'react-router-dom';

const PokemonType = ({type, pathname}) => {
    const mycolor = colors.find(color => {
        return color.id === type.name
    });

    const typeColor = {
        backgroundColor: mycolor.color,
        color: mycolor.id==='normal' || mycolor.id==='electric' || mycolor.id==='fairy'? 'black':'white'
    }

    return (
            <p to={`/types`} style={typeColor} className={pathname==='/'? 'type-color': 'type'}>{type.name}</p>
    )
}

export default PokemonType;