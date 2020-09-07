import React from 'react';

const FirstPokemon = ({firstPokemon, componentStyle}) => {
    return (
        <div className="first-evolution-collection" style={componentStyle.firstPokemon} >
            {  
                firstPokemon?
                (
                    <div className="first evolution-phase">
                        <img className="evolution-pic" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${firstPokemon.id}.png`} />
                        <div className="evolve-name" >{firstPokemon.name}</div>
                    </div>
                ):
                (
                    <p>LOADING...</p>
                )
            }
        </div>
    )
}

export default FirstPokemon;