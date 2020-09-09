import React from 'react';

const ThirdPokemon = ({thirdPokemon, componentStyle}) => {
    return (
        <div className="third-evolution-collection" style={componentStyle.thirdPokemon} >
            {
                thirdPokemon?
                (
                    <div className="third evolution-phase">
                        <img className="evolution-pic" alt={thirdPokemon.name} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${thirdPokemon.id}.png`} />
                        <div className="evolve-name" >{thirdPokemon.name}</div>
                    </div>
                ):
                <></>
            }
        </div>
    )
}

export default ThirdPokemon;